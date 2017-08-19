document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByClassName('button');
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        let rate = parseFloat(button.innerText);
        button.addEventListener('click', function() {
            alert('Change the video playback rate to ' + button.innerText);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {rate: rate}, function(response) {
              });
            });
        });
    }
});
