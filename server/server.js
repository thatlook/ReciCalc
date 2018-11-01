const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const router = require('./routes.js');

// Auth0 Modules
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const userInViews = require('../lib/middleware/userInViews');

const AUTH0_CONFIG = require('../auth0_config').AUTH0_CONFIG;

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));


// AUTHENTICATION
// -------------
// config express-session
const sess = {
  secret: process.env.AUTH0_CLIENT_SECRET || AUTH0_CONFIG.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN || AUTH0_CONFIG.domain,
    clientID: process.env.AUTH0_CLIENT_ID || AUTH0_CONFIG.clientID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET || AUTH0_CONFIG.secret,
    callbackURL: process.env.AUTH0_CALLBACK_URL || AUTH0_CONFIG.callbackURL
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
// -------------


// ROUTES
// -------------
app.use(userInViews());
app.use('/', router);
// -------------

// FALLBACK ROUTE
// -------------
// React Router is a Client Side Router (CSR)
// All the router logic lives at the top level/root of the app
// If page is refreshed outside of root url, send request to the root html, where the CSR logic lives
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// -------------

let port = process.env.PORT || 3000;
if(port === null || port === '') {
  port = 3000;
}
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});