import { topUp, getCardInfo } from "./dapp.js";

const walletConnectBtn = document.querySelector(".wallet-connect-btn");
const getCardInfoBtn = document.querySelector(".get-card-info-btn");

window.userWalletAddress = null;

async function loginWithMetaMask() {
  const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((e) => {
      console.error(e.message);
      return;
    });
  if (!accounts) {
    return;
  }

  window.userWalletAddress = accounts[0];
  walletConnectBtn.innerText = `${window.userWalletAddress.substr(
    0,
    6
  )}...${window.userWalletAddress.substr(-4)}`;
}

window.addEventListener("DOMContentLoaded", () => {
  toggleButton();
});

if (window.ethereum) {
  window.ethereum.on("accountsChanged", function (accounts) {
    window.userWalletAddress = accounts[0];
    walletConnectBtn.innerText = `${window.userWalletAddress.substr(
      0,
      6
    )}...${window.userWalletAddress.substr(-4)}`;
  });
}

function toggleButton() {
  walletConnectBtn.addEventListener("click", loginWithMetaMask);
  if (!window.ethereum) {
    walletConnectBtn.innerText = "Please Install MetaMask";
    walletConnectBtn.style.fontSize = "10px";
    return false;
  }
  loginWithMetaMask();
}

getCardInfoBtn.addEventListener(
  "click",
  getCardInfo("0x978Eb7feBC8fb1ef86818826eD4bF01c52bA4776")
);
