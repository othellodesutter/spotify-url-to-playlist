var auth_url = 'https://accounts.spotify.com/authorize?';
var client_id = '51a0a84d15434b379a60109246077d2f';
var redirect_url = "https://ebkoemnkkoapjiacacfkfgaopfdkpaoa.chromiumapp.org/";

var auth_params = {
    client_id: client_id,
    redirect_uri: redirect_url,
    response_type: 'token',
    scope: 'playlist-modify-private%20playlist-read-private%20playlist-modify-public%20playlist-read-collaborative',
    show_dialog: 'true'
};

const url = new URLSearchParams(Object.entries(auth_params));
url.toString();
auth_url += url;

document.querySelector('#sign-in').addEventListener('click', function () {
    chrome.identity.launchWebAuthFlow({url: auth_url, interactive: true}, function(responseUrl) { 
        var access_token = responseUrl.split('#')[1].split('&')[0].split('=')[1];
        console.log('Succesfully logged in to Spotify');
        chrome.storage.local.set({"access_token": access_token}, function() {
            console.log('Saved the access token in the local storage');
          });
        if (access_token) {
            chrome.tabs.update({
                url: "options/data.html"
           });
        };
    });
});