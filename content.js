console.log('"Time Alter - X Accel!" is loaded.');
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension: rate=" + request.rate);
    if (!sender.tab && request.rate) {
        document.querySelector('video').playbackRate = request.rate;
    }
  }
);
