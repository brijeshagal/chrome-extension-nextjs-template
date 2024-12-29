const script = document.createElement("script");
script.src = chrome.runtime.getURL("./injected.js");
(document.head || document.documentElement).appendChild(script);
script.onload = function () {
  this.remove(); // Clean up after the script is loaded
};


// calls on background.js
chrome.runtime.sendMessage({ greeting: "farewell" }, (response) => {
  console.log(response);
});

chrome.storage.local.set({ key: "Tester" }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value is " + result.key);
});