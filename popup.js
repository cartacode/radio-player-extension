var timer = new Timer();
var time = '00:00:00';
// Create a nessage connection
var port = chrome.runtime.connect({
    name: "Sample Communication"
});

port.postMessage({ type: "getTime", time: time });

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    console.log('msg: ', msg)
    if (typeof (msg) !== "string") {
      switch (msg.type) {
        case "startTime":
          var timeList = msg.time.split(':');
          timeList = timeList.map((item) => {
            return parseInt(item);
          })

          timeList = [0, ...timeList, 0];

          timer.start({ startValues: timeList, callback: function(newTimer) {
            document.getElementById('timeline').textContent = newTimer.getTimeValues().toString(['hours', 'minutes', 'seconds']);
          }});

          break;

        case "pauseTime":
          document.getElementById('timeline').textContent = msg.time;
          break;
        
        default:
          document.getElementById('timeline').textContent = msg.time;
          break;
      }
    }
  });

});

// click play and pause button
var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');

playButton.onclick = function(element) {
  element.target.style.display = 'none';
  pauseButton.style.display = 'block';

	port.postMessage({ type: "play_", time: time });
}

pauseButton.onclick = function(element) {
  element.target.style.display = 'none';
  playButton.style.display = 'block';

  timer.pause();
	port.postMessage({ type: "pause_", time: time });
}


// click volume off and on button
var volumOnElement = document.getElementById('volume_control');
var volumOffElement = document.getElementById('volume_control_off');

volumOnElement.onclick = function(element) {
  element.target.style.display = 'none';
  volumOffElement.style.display = 'block';

  port.postMessage({ type: "volumeOff", time: time });
}


volumOffElement.onclick = function(element) {
  element.target.style.display = 'none';
  volumOnElement.style.display = 'block';

  port.postMessage({ type: "volumeOn", time: time });
}