// background.js
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

var info;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    console.log("Sadsdsads")
  // When we get a message from the content script
  if(message.method == 'setInfo'){
      console.log("setinfo")
    info = message.info;
  }
    
  // When we get a message from the popup
  else if(message.method == 'getInfo'){
      console.log("getinfo")
    sendResponse(info);
  }
});
