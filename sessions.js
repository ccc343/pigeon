var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var models = require('./models/models');

var GOOGLE_CLIENT_ID = "845843206204-so6m70el9a2kmc6vukhkvjll296vcpl3.apps.googleusercontent.com";

// Stores the user email in a session.
// Called only during initial session authentication.
passport.serializeUser(function(user, done) {
  console.log('Serializing.');
  done(null, user.emails[0].value);
});

// Gets the user associated with the session.
// Called on every authenticated request.
passport.deserializeUser(function(email, done) {
  console.log('Deserializing.');
  models.User.where({ email: email })
    .fetch()
    .then(function(user) {
      done(null, user);
    });
});

var callbackURL;
if (process.env.NODE_ENV === 'production') {
  callbackURL = 'https://pigeonmail.herokuapp.com/auth/google/callback';
} else {
  callbackURL = 'http://localhost:5000/auth/google/callback';
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: require('./config/google_client_secret'),
    callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      done(null, profile);
    });
  }
));

exports.config = function(app) {
  app.use(session({
    secret: require('./config/session_secret'),
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}
