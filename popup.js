var timer = new Timer();
var time = '00:00:00';

// click play and pause button
var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');
// click volume off and on button
var volumOnElement = document.getElementById('volume_control');
var volumOffElement = document.getElementById('volume_control_off');

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

// Create a nessage connection
var port = chrome.runtime.connect({
    name: "Sample Communication"
});

port.postMessage({ type: "getTime", time: time });

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (typeof (msg) !== "string") {
      switch (msg.type) {
        case "pauseTime":
          document.getElementById('timeline').textContent = msg.time;
          break;

        case "startTime":
          var timeList = msg.time.split(':');
          timeList = timeList.reverse().map((item) => {
            return parseInt(item);
          })

          timeList = [0, ...timeList, 0];

          timer.start({ startValues: timeList, callback: function(newTimer) {
            document.getElementById('timeline').textContent = newTimer.getTimeValues().toString(['hours', 'minutes', 'seconds']);
          }});

          break;

        default:
          if (msg.audio) {
            var timeList = msg.time.split(':');
            timeList = timeList.reverse().map((item) => {
              return parseInt(item);
            })

            timeList = [0, ...timeList, 0];

            timer.start({ startValues: timeList, callback: function(newTimer) {
              document.getElementById('timeline').textContent = newTimer.getTimeValues().toString(['hours', 'minutes', 'seconds']);
            }});

            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
          } else {
            document.getElementById('timeline').textContent = msg.time;
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
          }
          
          break;
      }
    }
  });

});


// get data from storage
chrome.storage.sync.get("artist", function(obj) {
  document.getElementById('artist-name').textContent = obj.artist;
});

chrome.storage.sync.get("title", function(obj) {
  document.getElementById('title').textContent = obj.title;
});