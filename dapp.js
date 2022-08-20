import { USDT_ABI, SPSVF_ABI } from "./ABI.js";
import { ethers } from "./ethers-5.2.esm.min.js";

const currencyContractAddress = "0x2C6063De8d48865725050fAE86c4e50a22E2F333";
// come back later to make this dynamic
const instanceContractAddress = "0x39d9C6C3CB03B63357b7e5badABc58aF80FA558f";

let provider;
let signer;
let instance;
let currency;

if (!window.ethereum) {
  console.log("MetaMask is not installed");
} else {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  instance = new ethers.Contract(instanceContractAddress, SPSVF_ABI, signer);
  currency = new ethers.Contract(currencyContractAddress, USDT_ABI, signer);
}

async function approve(_amount) {
  let txn = await currency.approve(
    instanceContractAddress,
    ethers.utils.parseEther(_amount)
  );
  let hash = await txn.hash;
  return hash;
}

async function topUp(_amount) {
  let txn = await instance.topUp(ethers.utils.parseEther(_amount));
  let hash = await txn.hash;
  return hash;
}

async function spend(_amount) {
  let txn = await instance.spend(ethers.utils.parseEther(_amount));
  let hash = await txn.hash;
  return hash;
}

async function directGift(_recipientAddress, _amount) {
  let txn = await instance.directGift(
    ethers.utils.parseEther(_amount),
    _recipientAddress
  );
  let hash = await txn.hash;
  return hash;
}

async function giftBalance(_amount, _recipientAddress) {
  let txn = await instance.giftBalance(
    ethers.utils.parseEther(_amount),
    _recipientAddress
  );
  let hash = await txn.hash;
  return hash;
}

async function getCardInfo(_address) {
  let result = await instance.getCardHolderInfo(_address);
  console.log(result[0]._hex);
  console.log(result[1]._hex);
  console.log(result[2]);
  console.log(result[3]);
}

export { approve, topUp, spend, directGift, giftBalance, getCardInfo };
