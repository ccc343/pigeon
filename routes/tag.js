var validator = require('validator');
var apiHelpers = require('./api_helpers');
var errors = require('./errors');
var models = require('../models/models');
var auth = require('./user').auth;

exports.config = function(app) {
  app.post('/api/new_tag', function(req, res) {
    auth(req, res, function(user) {
      const name = validator.trim(req.body.name);
      if (!validator.isLength(name, 1, 32)) {
        return res.json({
          error: 'Tag names cannot be longer than 32 characters.'
        });
      }

      models.Organization.where({ id: user.get('organization_id') })
        .fetch()
        .then(function(org) {
          org.tags().create({
            name: name,
            description: validator.trim(req.body.description)
          })
            .then(function(tag) {
              return res.json({
                error: null,
                tag: tag
              });
            })
            .catch(function(err) {
              if (err.code == apiHelpers.UNIQUE_VIOLATION) {
                return res.json({
                  error: 'This tag already exists.'
                });
              }
              return errors.render500(req, res, err);
            });
        })
        .catch(function(err) {
          return errors.render500(req, res, err);
        });
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
