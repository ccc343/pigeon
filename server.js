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
app.get('/addOrg/:domain/:name/:description', function (req, res) {
  console.log("Adding organization...");
  console.log("Name is ", req.params.name);
  console.log("Domain is ", req.params.domain);
  console.log("Description is ", req.params.description);
  var params = [req.params.domain, req.params.name, req.params.description];
  db.query('INSERT INTO organizations (domain, name, description) VALUES ($1, $2, $3)',
  	params,
  	function(err, res) {
  		if (err) {
  			console.log("ERROR");
  		} else {
  			console.log("SUCCESS");
  		}
  	})
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
