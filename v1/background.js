chrome.runtime.onInstalled.addListener(function () {
	chrome.tabs.create({
		url: "options/login.html",
	});

	chrome.contextMenus.create({
		id: "spotifyaddcontext",
		title: "Add to Spotify playlist",
		contexts: ["link"]
	});
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	var spotify_url;
	var playlist_id;
	var track;
	spotify_url = info.selectionText;
	if (spotify_url.includes("spotify.com")) {
		track = spotify_url.split("track/")[1];
		if (track.includes('?si')) {
			track = track.split('?si')[0];
		};
	};

	chrome.storage.local.get(['access_token','playlist_id'], function(result) {
		const url = "https://api.spotify.com/v1/playlists/" + result.playlist_id + "/tracks?uris=spotify%3Atrack%3A" + track;
		const options = {
			method: 'post',
			headers: {
			  "Accept": "application/json",
			  "Content-Type": "application/json",
			  "Authorization": "Bearer " + result.access_token
			}
		  };

		fetch(url, options)
		  .then( res => res.json() )
		  .then( data => console.log(data) ); 
	  });
});