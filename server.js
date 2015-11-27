var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Static files.
app.use('/', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/lib'));
app.use('/', express.static(__dirname + '/public'));

// Parse JSON requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./sessions').config(app);
require('./api/routes').config(app);

app.get('*', function (req, res) {
  res.render('application.garnet');
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
