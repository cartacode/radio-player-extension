// var s = document.createElement ("script");
// s.src = chrome.extension.getURL ("js/jquery3.min.js");
// s.async = false;
// document.documentElement.appendChild (s);

var port = chrome.extension.connect({
    name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    addValuesToDom(msg)
});

var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');

playButton.onclick = function(element) {
	console.log('ok')
}

pauseButton.onclick = function(element) {
	console.log('ok')
}