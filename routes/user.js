var validator = require('validator');
var apiHelpers = require('./api_helpers');
var models = require('../models/models');

function getUserData(user) {
  return {
    id: user.get('id'),
    email: user.get('email')
  };
}

exports.auth = function(req, res, callback) {
  if (req.cookies.userId) {
    models.User.forge({ id: req.cookies.userId })
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
        return res.status(500).json({
          error: err.message
        });
      });
  } else {
    res.clearCookie('userId');
    return res.json({
      error: 'Please log in.'
    });
  }
};

exports.config = function(app) {
  app.post('/api/get_user_data', function(req, res) {
    exports.auth(req, res, function(user) {
      return res.json({
        error: null,
        user: getUserData(user)
      });
    });
  });

  app.post('/api/log_in', function(req, res) {
    if (!validator.isEmail(req.body.email)) {
      return res.json({
        error: 'Invalid email address.'
      });
    }

    models.User.forge({ email: req.body.email })
      .fetch()
      .then(function(user) {
        if (!user) {
          return res.json({
            error: 'This user does not exist.'
          });
        }

        res.cookie('userId', user.get('id'), {
          maxAge: 900000
        });

        return res.json({
          error: null,
          user: getUserData(user)
        });
      })
      .catch(function(err) {
        return res.status(500).json({
          error: err.message
        });
      });
  });

  app.post('/api/sign_up', function(req, res) {
    if (!validator.isEmail(req.body.email)) {
      return res.json({
        error: 'Invalid email address.'
      });
    }

    const domain = req.body.email.split('@')[1];
    models.Organization.forge({ domain: domain })
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
            res.cookie('userId', user.get('id'), {
              maxAge: 900000
            });

            return res.json({
              error: null,
              user: getUserData(user)
            });
          })
          .catch(function(err) {
            if (err.code == apiHelpers.UNIQUE_VIOLATION) {
              return res.json({
                error: 'Looks like you’re already registered! Please login.'
              });
            }

            return res.status(500).json({
              error: err.message
            });
          });
      })
      .catch(function(err) {
        return res.status(500).json({
          error: err.message
        });
      });
  });

  app.post('/api/log_out', function(req, res) {
    res.clearCookie('userId');
    return res.json({
      error: null
    });
  });
};
