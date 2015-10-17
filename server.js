var bodyParser = require('body-parser');
var express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(__dirname + '/build'));

app.get('/', function (req, res) {
  res.render('application.garnet');
});

app.post('/subscribe', function (req, res) {
  console.log(req.body);
  res.json({
    success: true
  });
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
