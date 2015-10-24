var bodyParser = require('body-parser');
var express = require('express');
var db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/lib'));
app.use('/', express.static(__dirname + '/public'));

// API end points
app.get('*', function (req, res) {
  res.render('application.garnet', { path: req.path });
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
