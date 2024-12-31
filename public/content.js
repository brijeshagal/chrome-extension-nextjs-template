const script = document.createElement("script");
script.src = chrome.runtime.getURL("./injected.js");
(document.head || document.documentElement).appendChild(script);
script.onload = function () {
  this.remove(); // Clean up after the script is loaded
};

document.addEventListener("click", (event) => {
  const clickedElement = event.target;  
  chrome.runtime.sendMessage({
    type: "click",
    element: clickedElement.outerHTML,
  });
});
