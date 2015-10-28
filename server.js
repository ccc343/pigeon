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
  res.render('application.garnet');
});

// Adding an organization
app.post('/add-organization', function (req, res) {
  var params = [req.body.domain, req.body.name, req.body.description];
  db.query('INSERT INTO organizations (domain, name, description) VALUES ($1, $2, $3)',
  	params,
  	function(err, res) {
  		if (err) {
  			console.log("ERROR");
  		} else {
  			console.log("SUCCESS");
  		}
  	});
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
