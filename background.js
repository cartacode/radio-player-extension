// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.create({url:chrome.extension.getURL("tabs_api.html")});
// });

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
      	new chrome.declarativeContent.PageStateMatcher({
	        pageUrl: {hostEquals: 'developer.chrome.com'},
	      }),
      	new chrome.declarativeContent.PageStateMatcher({
	        css: ["body"],
	      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
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
		});

	}).catch(function (err) {
		alert("can't open stream");
	});

chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg) {
    // Do your work here
   	chrome.storage.sync.get(/* String or Array */["audioUrl"], function(items){
	    console.log(items);
		var audio = new Audio(res.station.listen_url);
		audio.play();	    
	});
}