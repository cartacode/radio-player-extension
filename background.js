var audio = null;
var timer = new Timer();
var time = null;

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
      	new chrome.declarativeContent.PageStateMatcher({
	        css: ["body"],
	      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


function startTimer(startTime) {
	audio.play();
	console.log('start timer ')
	var port = chrome.runtime.connect({
	    name: "Sample Communication"
	});
	port.postMessage({ type: 'startTime', time: startTime });
	var timeList = startTime.split(':');
	timeList = timeList.map((item) => {
	  return parseInt(item);
	})

	timeList = [0, ...timeList, 0];

	timer.start({callback: function (timer) {
		time = timer.getTimeValues().toString(['hours', 'minutes', 'seconds']);
	}});
}

function pauseTimer() {
	audio.pause();
	timer.pause();

	var port = chrome.runtime.connect({
	    name: "Sample Communication"
	});
	port.postMessage({ type: 'endTime', time: time });
}

chrome.runtime.onConnect.addListener(function(port) {
	
    port.postMessage("back ground send");
      
	port.onMessage.addListener(function(msg) {
		console.log("message recieved " + msg);
		if (msg.type == 'play_') {
			startTimer(msg.time);

		} else {
			pauseTimer();
		}

	});

});

function coreGetApi(url) {
	return new Promise(function (resolve, reject) {
		
		fetch(url)
		.then(function(response) {

		  if (response.status >= 400 && response.status < 500) {
		    return response.text()
		    .then((responseText) => {
		      reject(responseText)
		    });
		    
		  } else {
		    response.json()
		    .then((responseText) => {
		      resolve(responseText);
		    });
		  }

		})
		.catch((err) => {
		  reject(err);
		});
	
	});
}

// check if document is ready

coreGetApi('https://stream.949thecity.com/api/nowplaying/4')
	.then(function (res) {
		const artist = res.now_playing.song.artist;
		const title = res.now_playing.song.text;
		const stationName = res.station.name;

		chrome.storage.sync.set({ "audioUrl": res.station.listen_url }, function(){
			//  A data saved callback omg so fancy
			audio = new Audio(res.station.listen_url);
		});

	}).catch(function (err) {
		alert("can't open stream");
	});