//Wire up event event handlers
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "fetch_top_domains"});
  });

   chrome.runtime.sendMessage({'method':'getInfo'},function(response){
    //response is now the info collected by the content script.
    for ( var bucket in response ) {
        $('#tabs_table tr:last').after('<tr><td>' + bucket +'</td></tr>');
   
      }
  });