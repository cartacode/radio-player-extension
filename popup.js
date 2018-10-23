var timer = new Timer();
var time = '00:00:00';
// Create a nessage connection
var port = chrome.runtime.connect({
    name: "Sample Communication"
});

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    console.log('POP mesage: ', typeof(msg));
    if (typeof (msg) !== "string") {
      if (msg.type === "startTime") {
        var timeList = msg.time.split(':');
        timeList = timeList.map((item) => {
          return parseInt(item);
        })

        timeList = [0, ...timeList, 0];

        timer.start({ startValues: timeList, callback: function(timer) {
          document.getElementById('timer').textContent = timer.getTimeValues().toString(['hours', 'minutes', 'seconds']);
        } });
      } else {
        document.getElementById('timer').textContent = msg.time;
      }
      
    }
  });

});

var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');

playButton.onclick = function(element) {
	console.log("Connected .....");
	port.postMessage({ type: "play_", time: time });
}

pauseButton.onclick = function(element) {
	console.log("Connected .....");
  timer.pause();
	port.postMessage({ type: "pause_", time: time });
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