console.log("background is setup");

const handleMessages = (request, sender, sendResponse) => {
  const { type, restParameters } = request;
  console.log({ request, sender, sendResponse });
  switch (type) {
    case "echo-content-message":
      console.log("[background] Received message:", { type, restParameters });
      sendResponse({
        status: "success",
        data: "Echoed message received in background.js",
      });
      break;

    case "ethereum-request":
      // Handle Ethereum request messages sent from content.js here
      const { method, params } = restParameters;
      console.log(`[background] Ethereum request received:`, method, params);

      // Example dynamic responses based on method
      switch (method) {
        case "eth_requestAccounts":
          sendResponse({ result: ["0xYourDynamicTestAccountHere"] });
          break;
        case "eth_chainId":
          sendResponse({ result: "0x1" });
          break;
        case "eth_getBalance":
          sendResponse({ result: "0x0" });
          break;
        case "eth_blockNumber":
          sendResponse({ result: "0x10D4F" });
          break;
        case "eth_getTransactionCount":
          sendResponse({ result: "0x0" });
          break;
        default:
          sendResponse({ error: `Unsupported method: ${method}` });
      }
      break;

    default:
      console.warn("[background] Unhandled message type:", type);
      sendResponse({ status: "error", error: "Unhandled message type" });
      break;
  }

  return true; // Keeps the sendResponse async for potential async operations
};

const handleConnections = (port) => {
  if (port.name === "popup") {
    port.onDisconnect.addListener(() => {
      console.log("[background] Popup closed");
    });
    console.log("[background] Popup connected");
  }
};

const main = async () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log({ request, sender, sendResponse });
    sendResponse({ farewell: "goodbye" });
  });
  //   chrome.runtime.onMessage.addListener(handleMessages);
  chrome.runtime.onConnect.addListener(handleConnections);
};

main();
