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
if (document.readyState!='loading') {
	coreGetApi('https://stream.949thecity.com/api/nowplaying/4')
		.then(function (res) {
			const artist = res.now_playing.song.artist;
			const title = res.now_playing.song.text;
			const stationName = res.station.name;

			// fill status
			document.getElementById('artist-name').innerHTML = artist;
			document.getElementById('title').innerHTML = title;

			document.getElementById('audioPlayer').src = res.station.listen_url;

		}).catch(function (err) {
			alert("can't open stream");
		});
}