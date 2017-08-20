console.log('"Time Alter - X Accel!" is loaded.');
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension: rate=" + request.rate);
    if (!sender.tab && request.rate) {
        // Change the playback rate.
        document.querySelector('video').playbackRate = request.rate;

        // Show a dialog.
        let id = '__time_alter_x_accel_dialog__';
        let e = document.createElement('div')
        e.id = id;
        let width = 500;
        let height = 50;
        e.style.position = 'fixed'
        e.style.zIndex = 99999;
        e.style.width = '' + width + 'px';
        e.style.height ='' + height + 'px';
        e.style.left = '' + (window.innerWidth - width) / 2 + 'px';
        e.style.top = '' + (window.innerHeight - height) / 10 + 'px';
        e.style.color = '#ccc';
        e.style.padding = '30px';
        e.style.backgroundColor = '#000';
        e.style.border = '2px solid gray';
        e.style.fontSize = '30px';
        e.style.fontFamily = 'Arial';
        e.style.borderRadius = '15px';
        // Align both sides to center.
        e.style.textAlign = 'center';
        e.style.lineHeight = '' + height + 'px';

        e.innerText = 'Update the playback rate to ' + request.rate;

        document.body.appendChild(e);

        // Hide the dialog.
        setTimeout(function() {
          // Fade out.
          e.style.transition = 'visibility 0s 0.5s, opacity 0.5s linear';
          e.style.visibility = 'hidden';
          e.style.opacity = 0;
        }, 1500);

        e.addEventListener('webkitTransitionEnd', function() {
          let t = document.getElementById(id);
          if (t) {
            document.body.removeChild(t);
          }
        }, false);
    }
  }
);
