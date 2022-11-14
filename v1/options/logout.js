const logoutButton = document.getElementById("logout");

logoutButton.addEventListener('click', function() {
  chrome.storage.local.remove(['access_token'], function() {
    chrome.tabs.update({
      url: "./options/login.html"
    });
  });
});