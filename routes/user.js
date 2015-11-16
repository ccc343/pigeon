var validator = require('validator');
var apiHelpers = require('./api_helpers');
var errors = require('./errors');
var models = require('../models/models');

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
  if (req.cookies['pigeon_auth']) {
    const cookie = JSON.parse(req.cookies['pigeon_auth']);

    models.User.where({ id: cookie.userId })
      .fetch()
      .then(function(user) {
        if (!user) {
          return res.json({
            error: 'Please log in.'
          });
        }

        callback(user);
      })
      .catch(function(err) {
        return errors.render500(req, res, err);
      });
  } else {
    res.clearCookie('pigeon_auth');
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

  // Logs the user in.
  // @param {String} email
  app.post('/api/log_in', function(req, res) {
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

    models.User.where({ email: req.body.email })
      .fetch()
      .then(function(user) {
        if (!user) {
          return res.json({
            error: 'This user does not exist.'
          });
        }

        bootstrap(user, function(model) {
          setCookie(req, res, user);

          return res.json({
            error: null,
            user: model
          });
        });
      })
      .catch(function(err) {
        return errors.render500(req, res, err);
      });
  });

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
    res.clearCookie('pigeon_auth');
    return res.json({
      error: null
    });
  });

  app.post('/api/subscribe', function(req, res) {
    exports.auth(req, res, function(user) {
      models.Tag.where({
        id: req.body.id
      })
        .fetch()
        .then(function(tag) {
          if (!tag) {
            return res.json({
              error: 'This tag does not exist.'
            });
          }

          tag.users().attach(user).then(function(users) {
            return res.json({
              error: null,
              tagUsers: users
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
        .fetch()
        .then(function(tag) {
          if (!tag) {
            return res.json({
              error: 'This tag does not exist.'
            });
          }

          tag.users().detach(user).then(function(users) {
            return res.json({
              error: null,
              tagUsers: users
            });
          });
        })
        .catch(function(err) {
          return errors.render500(req, res, err);
        });
    });
  });
};
