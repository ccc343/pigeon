var validator = require('validator');
var apiHelpers = require('./api_helpers');
var errors = require('./errors');
var models = require('../models/models');

exports.config = function(app) {

  app.post('/api/new_tag', function(req, res) {
    const name = validator.trim(req.body.name);
    if (!validator.isLength(name, 1, 32)) {
      return res.json({
        error: 'Tag names cannot be longer than 32 characters.'
      });
    }

    models.Tag.forge({
      name: name,
      description: validator.trim(req.body.description),
      organization_id: 1
    })
      .save()
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
  });
};
