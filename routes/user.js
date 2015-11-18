var validator = require('validator');
var apiHelpers = require('./api_helpers');
var errors = require('./errors');
var models = require('../models/models');
var passport = require('passport');

function setCookie(req, res, user) {
  const data = JSON.stringify({
    userId: user.get('id')
  });

  res.cookie('pigeon_auth', data, {
    maxAge: 10 * 60 * 1000
  });
}

function bootstrap(user, callback) {
  user.load(['organization', 'organization.users', 'organization.tags', 'organization.tags.users', 'tags'])
    .then(function(model) {
      callback(model);
    });
}

exports.auth = function(req, res, callback) {
  if (req.isAuthenticated()) { 
    callback(req.user); 
  } else {
    return res.json({
      error: 'Please log in.'
    });
  }
};

exports.config = function(app) {
  // Attempts to pull user data from the pigeon_auth cookie.
  app.post('/api/get_user_data', function(req, res) {
    exports.auth(req, res, function(user) {
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
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  // After the user logs in through Google
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      var profile = req.user;

      models.User.where({ email: profile.emails[0].value })
      .fetch()
      .then(function(user) {
        if (!user) {
          console.log('no user found');
          res.redirect('/signup');
        } else {
          res.redirect('/');
        }
      });
    });


  // Logs the user in.
  // @param {String} email
  // app.post('/api/log_in', function(req, res) {
  //   if (!req.body.email) {
  //     return res.json({
  //       error: 'Please enter an email.'
  //     });
  //   }

  //   if (!validator.isEmail(req.body.email)) {
  //     return res.json({
  //       error: 'Invalid email address.'
  //     });
  //   }

  //   models.User.where({ email: req.body.email })
  //     .fetch()
  //     .then(function(user) {
  //       if (!user) {
  //         return res.json({
  //           error: 'This user does not exist.'
  //         });
  //       }

  //       bootstrap(user, function(model) {
  //         setCookie(req, res, user);

  //         return res.json({
  //           error: null,
  //           user: model
  //         });
  //       });
  //     })
  //     .catch(function(err) {
  //       return errors.render500(req, res, err);
  //     });
  // });

  // Signs up a new user.
  // @param {String} email
  app.post('/api/sign_up', function(req, res) {
    if (!req.body.email) {
      return res.json({
        error: 'Please enter an email.'
      });
    }

    if (!validator.isEmail(req.body.email)) {
      return res.json({
        error: 'Invalid email address.'
      });
    }

    const domain = req.body.email.split('@')[1];
    models.Organization.where({ domain: domain })
      .fetch()
      .then(function(org) {
        if (!org) {
          return res.json({
            error: 'This organization is not registered.'
          });
        }

        models.User.forge({
          email: req.body.email,
          organization_id: org.get('id')
        })
          .save()
          .then(function(user) {
            bootstrap(user, function(model) {
              setCookie(req, res, user);

              return res.json({
                error: null,
                user: model
              });
            });
          })
          .catch(function(err) {
            if (err.code == apiHelpers.UNIQUE_VIOLATION) {
              return res.json({
                error: 'Looks like you’re already registered! Please log in.'
              });
            }

            return errors.render500(req, res, err);
          });
      })
      .catch(function(err) {
        return errors.render500(req, res, err);
      });
  });

  // Logs out the current user.
  app.post('/api/log_out', function(req, res) {
    req.logout();
    return res.json({
      error: null
    });
  });

  app.post('/api/subscribe', function(req, res) {
    exports.auth(req, res, function(user) {
      models.Tag.where({
        id: req.body.id
      })
        .fetch({
          withRelated: 'users'
        })
        .then(function(tag) {
          if (!tag) {
            return res.json({
              error: 'This tag does not exist.'
            });
          }

          tag.related('users').attach(user)
            .then(function() {
              tag.load('users').then(function(tagReloaded) {
                return res.json({
                  error: null,
                  users: tagReloaded.related('users')
                });
              });
            });
        })
        .catch(function(err) {
          return errors.render500(req, res, err);
        });
    });
  });

  app.post('/api/unsubscribe', function(req, res) {
    exports.auth(req, res, function(user) {
      models.Tag.where({
        id: req.body.id
      })
        .fetch({
          withRelated: 'users'
        })
        .then(function(tag) {
          if (!tag) {
            return res.json({
              error: 'This tag does not exist.'
            });
          }

          tag.related('users').detach(user)
            .then(function() {
              tag.load('users').then(function(tagReloaded) {
                return res.json({
                  error: null,
                  users: tagReloaded.related('users')
                });
              });
            });
        })
        .catch(function(err) {
          return errors.render500(req, res, err);
        });
    });
  });
};
