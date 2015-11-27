var apiChrome = require('./api_chrome');
var user = require('./user');
var tag = require('./tag');
var organization = require('./organization');

exports.config = function(app) {
  apiChrome.config(app);
  user.config(app);
  tag.config(app);
  organization.config(app);
}
