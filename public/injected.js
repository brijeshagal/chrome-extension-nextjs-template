// injected.js
console.log("wallet extension injected");
// content.js

const ethereumProxy = new Proxy(
  {
    isMetamask: true,
  },
  {
    get(target, prop) {
      console.log({ target });
      switch (prop) {
        case "isMetaMask":
          return true;
        case "chainId":
          return "0x1";
        case "request":
          console.log("requesting eth_accounts");
          return chrome.runtime.sendMessage(
            { greeting: "farewell" },
            (response) => {
              console.log(response);
            }
          );
        default:
          return undefined;
      }
    },
  }
);


// Inject the proxy as `window.ethereum`
window.ethereum = ethereumProxy;
