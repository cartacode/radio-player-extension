var audio = null;

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

//for listening any message which comes from runtime
chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg) {
	onsole.log("before Connected .....");
   // Do your work here
   chrome.extension.onConnect.addListener(function(port) {
     
     console.log("Back Connected .....");
      port.onMessage.addListener(function(msg) {
      	console.log("Back message Connected .....", msg);
      });

   });
}

chrome.extension.onConnect.addListener(function(port) {
    port.postMessage("back ground send");
      
	port.onMessage.addListener(function(msg) {
		console.log("message recieved " + msg);
		if (msg == 'play_') {
			audio.play();
		} else {
			audio.pause()
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