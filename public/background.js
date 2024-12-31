console.log("background is setup");

let clickCount = 0;
let capturedClickData;
try {
  chrome.storage.local.get(["clickCount"], (data) => {
    clickCount = data.clickCount || 0;
    console.log("Click count from local storage: ", { clickCount });
  });
} catch (e) {
  console.log({ e });
}

chrome.runtime.onConnect.addListener((port) => handleConnections(port));

const handleConnections = (port) => {
  if (port.name === "popup") {
    port.onDisconnect.addListener(() => {
      console.log("[background] Popup closed");
    });
    console.log("[background] Popup connected");

    if (capturedClickData) {
      port.postMessage({
        type: "click",
        element: capturedClickData,
        clicks: clickCount,
      });
      capturedClickData = null;
    }
  }
};

(async () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "click") {
      capturedClickData = request.element;
      clickCount++;
      chrome.storage.local.set({ clickCount });
      sendResponse({ farewell: "goodbye" });
    }
  });
})();
