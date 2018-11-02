// Initializing our Auth0Lock
var lock = new Auth0Lock(
  'Zi98h1wvF3hpE6aTHPf663zi1U75PFZ1',
  'rocket-turtles.auth0.com'
);

// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    document.getElementById('nick').textContent = profile.nickname;

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});