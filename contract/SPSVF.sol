// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Privileges.sol";
import "./IERC20.sol";

contract SPSVF is PlatformPrivilege, MerchantPrivilege {
    ////////////////////////////////
    // fixed properties/////////////
    ////////////////////////////////
    string public merchantName;
    uint256 public creationTime;
    // if true, hash of client's info will be kept, and clients will be not allowed to gift / transfer
    bool public authEnabled;
    // base currency contract, e.g USDT or USDC
    IERC20 public baseCurrencyContract;
    
    constructor(string memory _merchantName, bool _authEnabled, IERC20 _baseCurrencyContract) {
        merchantName = _merchantName;
        authEnabled = _authEnabled;
        creationTime = block.timestamp;
        baseCurrencyContract = _baseCurrencyContract;
    }

    ////////////////////////////////
    // statistics///////////////////
    ////////////////////////////////
    uint256 public totalLiability;
    uint256 public totalSecuredLiability;
    
    ////////////////////////////////
    // modifiable parameters////////
    ////////////////////////////////
    uint256 public bonusRate;
    // if true, new top-ups will be rejected
    bool public pauseNewTopUp;

    ////////////////////////////////
    // account model////////////////
    ////////////////////////////////
    struct topUpTxn {
        uint256 timestamp;
        uint256 principal;
        uint256 bonus;
    }

    struct saleTxn {
        uint256 timestamp;
        uint256 txnValue;
        uint256 releaseValue;
    }

    struct giftTxn {
        uint256 timestamp;
        uint256 principalDebited;
        uint256 bonus;
        address recipient;
    }

    struct Account {
        uint256 principalBal;
        uint256 bonusBal;
        bytes32 accountNameHash;
        bytes32 identificationHash;
        mapping(uint256 => topUpTxn) topUpTxns;
        mapping(uint256 => saleTxn) saleTxns;
        mapping(uint256 => giftTxn) giftTxns;
        bool complained;
        uint256 topUpCount;
        uint256 saleCount;
        uint256 giftCount;
    }

    mapping(address => Account) private accounts;

    ////////////////////////////////
    //client-side functions/////////
    ////////////////////////////////
    event topUpSuccess(address client, uint256 principal, uint256 bonus);

    function initialTopUpAuth(uint256 _principal, bytes32 _accountNameHash, bytes32 _identificationHash) external payable {
        require(authEnabled == true && accounts[msg.sender].topUpCount == 0, "No authentication required / real-name details already registered");
        // pull fund from client's wallet, approval required
        baseCurrencyContract.transferFrom(msg.sender, address(this), _principal);
        accounts[msg.sender].accountNameHash = _accountNameHash;
        accounts[msg.sender].identificationHash = _identificationHash;
        topUpCore(_principal, msg.sender);
    }

    function topUp(uint256 _principal) external payable {
        require(authEnabled == false || accounts[msg.sender].topUpCount > 0, "Please add real-name details to open a card");
        // pull fund from client's wallet, approval required
        baseCurrencyContract.transferFrom(msg.sender, address(this), _principal);
        // topUpCore(_principal, msg.sender);
    }

    event saleSuccess(address client, uint256 amount, uint256 releasedAmount);

    function spend(uint256 _amount) public {
        require(_amount < accounts[msg.sender].bonusBal + accounts[msg.sender].principalBal, "Insufficient balance");
        uint256 newSaleID = accounts[msg.sender].saleCount;
        if (_amount <= accounts[msg.sender].bonusBal) {
            accounts[msg.sender].bonusBal -= _amount;
            accounts[msg.sender].saleTxns[newSaleID].timestamp = block.timestamp;
            accounts[msg.sender].saleTxns[newSaleID].txnValue = _amount;
            accounts[msg.sender].saleTxns[newSaleID].releaseValue = 0;
            totalLiability -= _amount;
            emit saleSuccess(msg.sender, _amount, 0);
        } else if (_amount > accounts[msg.sender].bonusBal) {
            uint256 bonusToDebit = accounts[msg.sender].bonusBal;
            uint256 principalToDebit = _amount - bonusToDebit;
            accounts[msg.sender].bonusBal -= bonusToDebit;
            accounts[msg.sender].principalBal -= principalToDebit;
            accounts[msg.sender].saleTxns[newSaleID].timestamp = block.timestamp;
            accounts[msg.sender].saleTxns[newSaleID].txnValue = _amount;
            accounts[msg.sender].saleTxns[newSaleID].releaseValue = principalToDebit;
            totalLiability -= _amount;
            totalSecuredLiability -= principalToDebit;
            releaseToMerchant(principalToDebit);
            emit saleSuccess(msg.sender, _amount, principalToDebit);
        }
        accounts[msg.sender].saleCount ++;
    }

    function getBalance() public view returns(uint256,uint256) {
        require(accounts[msg.sender].topUpCount > 0, "You are not / have not been a cardholder for this scheme");
        return (accounts[msg.sender].principalBal, accounts[msg.sender].bonusBal); 
    }

    function getTxnRecord(uint256 _type, uint256 _txnId) public view returns(uint256,uint256,uint256) {
        // _type: 0 for top-up, 1 for sale
        require(_type == 0 || _type == 1, "Invalid transaction type input");
        require(accounts[msg.sender].topUpCount > 0, "You are not / have not been a cardholder for this scheme");
        if (_type == 0) {
            require(_txnId < accounts[msg.sender].topUpCount, "No such top-up transaction");
            return (accounts[msg.sender].topUpTxns[_txnId].timestamp, accounts[msg.sender].topUpTxns[_txnId].principal, accounts[msg.sender].topUpTxns[_txnId].bonus);
        } else {
            require(_txnId < accounts[msg.sender].saleCount, "No such sale transaction");
            return (accounts[msg.sender].saleTxns[_txnId].timestamp, accounts[msg.sender].saleTxns[_txnId].txnValue, accounts[msg.sender].saleTxns[_txnId].releaseValue);
        }
    }

    function getGiftRecord(uint256 _txnId) public view returns(uint256,uint256,uint256,address) {
        require(accounts[msg.sender].giftCount > 0, "You are not / have not been a cardholder for this scheme");
        require(_txnId < accounts[msg.sender].giftCount, "No such outbound transfer");
        return (accounts[msg.sender].giftTxns[_txnId].timestamp, accounts[msg.sender].giftTxns[_txnId].principalDebited, accounts[msg.sender].giftTxns[_txnId].bonus, accounts[msg.sender].giftTxns[_txnId].recipient);
    }

    event giftSuccess(address _from, address _to, uint256 _principalDebited, uint256 _bonus);

    // transferring balance to another account, user can only transfer principal balance and no bonus will be issued to recipient
    function giftBalance(uint256 _amount, address _recipient) public {
        require(authEnabled == false, "You are not allowed to gift / transfer balance");
        require(_amount <= accounts[msg.sender].principalBal, "Insufficient principal balance");
        accounts[msg.sender].principalBal -= _amount;
        addGiftRecord(msg.sender, _amount, 0, _recipient);
        topUpCorePrincipal(_amount, _recipient);
        emit giftSuccess(msg.sender, _recipient, _amount, 0);
    }

    // sending a gift card directly
    function directGift(uint256 _amount, address _recipient) external payable {
        require(authEnabled == false, "You are not allowed to gift / transfer balance");
        // pull fund from client's wallet, approval required
        baseCurrencyContract.transferFrom(msg.sender, address(this), _amount);
        addTopUpRecord(msg.sender, _amount, 0);
        addGiftRecord(msg.sender, _amount, _amount * bonusRate / 100, _recipient);
        topUpCore(_amount, _recipient);
        emit giftSuccess(msg.sender, _recipient, _amount, _amount * bonusRate / 100);
    }

    ////////////////////////////////
    //triggered by contract/////////
    ////////////////////////////////
    event fundReleased(uint256 releaseAmount);

    function releaseToMerchant(uint256 _releaseAmount) private {
        baseCurrencyContract.transfer(platform,_releaseAmount);
        emit fundReleased(_releaseAmount);
    }

    // include bonus and update contract statistics
    function topUpCore(uint256 _principal, address _client) private {
        uint256 principalToCredit = _principal;
        uint256 bonusToCredit = principalToCredit * bonusRate / 100;
        uint256 totalToCredit = principalToCredit + bonusToCredit;
        totalLiability += totalToCredit;
        totalSecuredLiability += principalToCredit;
        addTopUpRecord(_client, principalToCredit, bonusToCredit);
        accounts[_client].principalBal += principalToCredit;
        accounts[_client].bonusBal += bonusToCredit;
        emit topUpSuccess(_client, principalToCredit, bonusToCredit);
    }

    // used for transfer between accounts, exclude bonus and without updating statistics
    function topUpCorePrincipal(uint256 _principal, address _client) private {
        addTopUpRecord(_client, _principal, 0);
        accounts[_client].principalBal += _principal;
        emit topUpSuccess(_client, _principal, 0);
    }

    function addTopUpRecord(address _client, uint256 _principalToCredit, uint256 _bonusToCredit) private {
        uint256 newTopUpID = accounts[_client].topUpCount;
        accounts[_client].topUpTxns[newTopUpID].timestamp = block.timestamp;
        accounts[_client].topUpTxns[newTopUpID].principal = _principalToCredit;
        accounts[_client].topUpTxns[newTopUpID].bonus = _bonusToCredit;
        accounts[_client].topUpCount ++;
    }

    function addGiftRecord(address _sender, uint256 _principalDebited, uint256 _bonus, address _recipient) private {
        uint256 newGiftID = accounts[msg.sender].giftCount;
        accounts[_sender].giftTxns[newGiftID].timestamp = block.timestamp;
        accounts[_sender].giftTxns[newGiftID].principalDebited = _principalDebited;
        accounts[_sender].giftTxns[newGiftID].bonus = _bonus;
        accounts[_sender].giftTxns[newGiftID].recipient = _recipient;
        accounts[_sender].giftCount ++;
    }

    ////////////////////////////////
    //merchant-side functions///////
    ////////////////////////////////

    // in percentage (if the merchant want to set bonus rate to 20%, _newBonusRate should be 20)
    function modifyBonusRate(uint256 _newBonusRate) public onlyMerchant {
        bonusRate = _newBonusRate;
    }

    function getCardHolderInfo(address _client) public onlyMerchant view returns(uint256,uint256,bytes32,bytes32) {
        uint256 principalBal = accounts[_client].principalBal;
        uint256 bonusBal = accounts[_client].bonusBal;
        bytes32 accountNameHash = accounts[_client].accountNameHash;
        bytes32 identificationHash = accounts[_client].identificationHash;
        return (principalBal, bonusBal, accountNameHash, identificationHash);
    }
}