var currentUser;
const saveButton = document.getElementById("save_playlist_id");

const getData = function() {
    chrome.storage.local.get(['access_token'], function(result) {
		const url = "https://api.spotify.com/v1/me";
		const options = {
			headers: {
			  "Accept": "application/json",
			  "Content-Type": "application/json",
			  "Authorization": "Bearer " + result.access_token
		}};

    fetch(url, options)
        .then(res => res.json())
        .then(function (data) {
          document.getElementById('welcome').innerHTML = "Welcome " + data.display_name + '! These are your playlists:';
          currentUser = data.id;
      })
        .catch(error => console.log(error))
})};

const getPlaylists = function() {
  chrome.storage.local.get(['access_token'], function(result) {
  const url = "https://api.spotify.com/v1/me/playlists?limit=50";
  const options = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + result.access_token
  }};

  fetch(url, options)
      .then(res => res.json())
      .then(function (data) {
        appendData(data.items);
      })
      .catch(error => console.log(error))
  })};

  function appendData(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].owner.id == currentUser || data[i].collaborative == true) {
          var table = document.getElementById("playlists");
          var row = table.insertRow(0);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.innerHTML = data[i].name;
          cell2.innerHTML = data[i].id;
          cell3.innerHTML = '<button class="btn btn-success" id="savePlaylistId" value=\"' + data[i].id + '\">Save</button>';
      }};
}

const getCurrentPlaylist = function() {
    chrome.storage.local.get(['playlist_id'], function(result) {
        if (result.playlist_id) {
            document.getElementById("playlist_id").value = result.playlist_id;
        }
})};


window.addEventListener('load', function() {
  getData();
  getPlaylists();
  getCurrentPlaylist();
});

/* const savePlaylistId = document.getElementsById("savePlaylistId")
savePlaylistId.addEventListener('click', function() {
    var savePlaylistIdValue = document.getElementById("savePlaylistId").value;
    chrome.storage.local.set({'playlist_id': savePlaylistIdValue}, function() {
        console.log('Playlist ID saved');
})}); */



saveButton.addEventListener('click', function() {
    var playlist_id = document.getElementById("playlist_id").value;
    chrome.storage.local.set({'playlist_id': playlist_id}, function() {
        console.log('Playlist ID saved');
})});