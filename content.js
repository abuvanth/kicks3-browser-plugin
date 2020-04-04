// content.js
function notify(bucket){
    console.log('asdsada')
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
        }
         else{
        var notification = new Notification('S3 Buckets Found', {
          body: bucket[0],
        });
        }
}
let s3regex=/[a-z\-_0-9.]+\.s3\.?(?:[a-z\-_0-9.]+)?\.amazonaws\.com|(?<!\.)s3\.?(?:[a-z\-_0-9.]+)?\.amazonaws\.com\\?\/[a-z\-_0-9.]+/g;
let  html = document.documentElement.innerHTML; 
let array = html.match(s3regex)
if(array!=null){
    //notify(array)
    alert(array)
    scan_s3(array)
    
}
for(var i=0;i<document.scripts.length;i++){
    if(document.scripts[i].src!=''){
    fetch(document.scripts[i].src,{method:"GET"}).then(function (response) {
    return response.text();
  })
  .then(function (body) {
      let jscontent=body
    s3urls=jscontent.match(s3regex)
    if(s3urls!=null){
      //notify(s3urls)
      alert(s3urls)
      scan_s3(s3urls)
      
    }
  });
    }
}
function scan_s3(urls){
    var opts = {
        method: 'POST',      
        headers: {"content-type":"application/json"},
        body:JSON.stringify({"bucketlist":urls})
      };
      fetch('http://127.0.0.1:5000/', opts).then(function (response) {
        return response.json();
      })
      .then(function (body) {
        console.log(body)
      });
    }
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("sabdjsbjabsjbajs")
          if( request.message === "fetch_top_domains" ) {
            let s3regex=/[a-zA-Z\-_0-9.]+\.s3\.?(?:[a-zA-Z\-_0-9.]+)?\.amazonaws\.com|(?<!\.)s3\.?(?:[a-zA-Z\-_0-9.]+)?\.amazonaws\.com\\?\/[a-zA-Z\-_0-9.]+/g;
            let  html = document.documentElement.innerHTML; 
            let array = html.match(s3regex)
            if(array!=null){
                chrome.runtime.sendMessage({'method':'setInfo', "info": array});
            }
            for(var i=0;i<document.scripts.length;i++){
                if(document.scripts[i].src!=''){
                fetch(document.scripts[i].src,{method:"GET"}).then(function (response) {
                return response.text();
              })
              .then(function (body) {
                  let jscontent=body
                s3urls=jscontent.match(s3regex)
                if(s3urls!=null){
                  chrome.runtime.sendMessage({'method':'setInfo', "info": s3urls});
                }
              });
                }
            }
           }
         }
       );
