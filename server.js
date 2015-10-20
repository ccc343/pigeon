var bodyParser = require('body-parser');
var express = require('express');
var db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(__dirname + '/build'));

// API end points
app.get('/', function (req, res) {
  db.query('SELECT * FROM organizations', null, function (err, result) {
    if (err) {
      return console.log(err.code);
    }

    console.log(result.rows);
  });
  res.render('application.garnet');
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
