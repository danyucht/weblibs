console.log('Hello from the background! WebLibs!!!');

chrome.tabs.onUpdated.addListener(function(tab) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      chrome.tabs.sendMessage(
        tab,
        {
          url: tabs[0].url
        },
        function(response) {
          console.log("im here")
          //console.log('message recieve status: ' + response.status);
        }
      );
    }
  );
});