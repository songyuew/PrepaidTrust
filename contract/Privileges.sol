// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract PlatformPrivilege {
  address public platform;

  constructor() {
    platform = 0xC9aeF48C49C80D016b6d71d1FeEe4E7dCEBff7Ed;
  }

  modifier onlyPlatform() {
    require(msg.sender == platform, "You are not authorized (platform admin only)");
    _;
  }

  function transferPlatformAdmin(address _newPlatformAdmin) public onlyPlatform {
    if (_newPlatformAdmin != address(0)) {
      platform = _newPlatformAdmin;
    }
  }
}

contract MerchantPrivilege {
  address public merchant;

  constructor() {
    merchant = msg.sender;
  }

  modifier onlyMerchant() {
    require(msg.sender == merchant, "You are not authorized (merchant admin only)");
    _;
  }

  function transferFundPrivilege(address _newMerchant) public onlyMerchant {
    if (_newMerchant != address(0)) {
      merchant = _newMerchant;
    }
  }
}