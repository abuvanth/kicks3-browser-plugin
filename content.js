// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        let s3regex=/[a-zA-Z\-_0-9.]+\.s3\.?(?:[a-zA-Z\-_0-9.]+)?\.amazonaws\.com|(?<!\.)s3\.?(?:[a-zA-Z\-_0-9.]+)?\.amazonaws\.com\\?\/[a-zA-Z\-_0-9.]+/g;
let  html = document.documentElement.innerHTML; 
let array = [...html.match(s3regex)];

console.log(array)
var opts = {
    method: 'POST',      
    headers: {"content-type":"application/json"},
    body:JSON.stringify({"bucketlist":array})
  };
  fetch('http://127.0.0.1:5000/', opts).then(function (response) {
    return response.json();
  })
  .then(function (body) {
    console.log(body)
  });
      }
    }
  );
