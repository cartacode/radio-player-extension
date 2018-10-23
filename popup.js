var port = chrome.extension.connect({
    name: "Sample Communication"
});

port.onMessage.addListener(function(msg) {
    console.log('pop received message:', msg)
});

var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');

playButton.onclick = function(element) {
	console.log("Connected .....");
	port.postMessage("play_");
}

pauseButton.onclick = function(element) {
	console.log("Connected .....");
	port.postMessage("pause_");
}

var player = document.getElementById("play");
player.addEventListener("click", function () {
  console.log("it's click time");
});
player.addEventListener("play", function () {
  console.log("it's go time");
});

player.addEventListener("pause", function () {
  console.log("it's pause time");
});