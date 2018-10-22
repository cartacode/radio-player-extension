// var s = document.createElement ("script");
// s.src = chrome.extension.getURL ("js/jquery3.min.js");
// s.async = false;
// document.documentElement.appendChild (s);

var port = chrome.extension.connect({
    name: "Sample Communication"
});

port.onMessage.addListener(function(msg) {
    console.log('pop es:', msg)
});

var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');


playButton.onclick = function(element) {
	console.log("Connected .....");
	// check selection text can be converted into digit
	port.postMessage("play_");
}

pauseButton.onclick = function(element) {
	console.log('ok')
	console.log("Connected .....");
	// check selection text can be converted into digit
	port.postMessage("pause_");
}