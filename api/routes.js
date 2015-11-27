var user = require('./user');
var tag = require('./tag');
var organization = require('./organization');

exports.config = function(app) {
  user.config(app);
  tag.config(app);
  organization.config(app);
}
