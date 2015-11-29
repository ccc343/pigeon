var validator = require('validator');
var apiHelpers = require('./api_helpers');
var models = require('../models/models');
var passport = require('passport');

function bootstrap(user, callback) {
  user.load(['organization', 'organization.users', 'organization.tags',
    'organization.tags.users', 'tags'])
    .then(function(model) {
      callback(model);
    });
}

exports.config = function(app) {
  app.post('/api/get_user_data', function(req, res) {
    apiHelpers.auth(req, res, function(user) {
      bootstrap(user, function(model) {
        return res.json({
          error: null,
          user: model
        });
      });
    });
  });

  // Logs the user in through Google
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  // After the user logs in through Google
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      const email = req.user.emails[0].value;

      models.User.where({ email: email })
      .fetch()
      .then(function(user) {
        // Create a new user if this user doesn't exist.
        if (!user) {
          const domain = email.split('@')[1];
          models.Organization.where({ domain: domain })
            .fetch()
            .then(function(org) {
              if (!org) {
                return res.redirect('/login/?code=0');
              }

              models.User.forge({
                email: email,
                organization_id: org.get('id')
              })
                .save()
                .then(function() {
                  return res.redirect('/login/?code=1');
                })
                .catch(function(err) {
                  return apiHelpers.render500(req, res, err);
                });
            })
            .catch(function(err) {
              return apiHelpers.render500(req, res, err);
            });
        } else {
          return res.redirect('/');
        }
      });
    });

  // Logs out the current user.
  app.post('/api/log_out', function(req, res) {
    req.logout();
    return res.json({
      error: null
    });
  });
};
