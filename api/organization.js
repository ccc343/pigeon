var validator = require('validator');
var apiHelpers = require('./api_helpers');
var models = require('../models/models');

exports.config = function(app) {
  app.post('/api/new_organization', function(req, res) {
    if (!validator.isFQDN(req.body.domain)) {
      return res.json({
        error: 'Invalid domain.'
      });
    }

    const name = validator.trim(req.body.name);
    if (!validator.isLength(name, 1, 64)) {
      return res.json({
        error: 'Organization names cannot be longer than 64 characters.'
      });
    }

    models.Organization.forge({
      domain: req.body.domain,
      name: name,
      description: validator.trim(req.body.description)
    })
      .save()
      .then(function(org) {
        return res.json({
          error: null,
          organization: org
        });
      })
      .catch(function(err) {
        if (err.code == apiHelpers.UNIQUE_VIOLATION) {
          return res.json({
            error: 'This organization already exists.'
          });
        }
        return apiHelpers.render500(req, res, err);
      });
  });
};
