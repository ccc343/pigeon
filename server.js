var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// var db = require('./db');

// allows cross domain requests (for chrome extension)
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

var app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/lib'));
app.use('/', express.static(__dirname + '/public'));

app.use(allowCrossDomain);

require('./routes/user').config(app);
require('./routes/organization').config(app);

app.get('*', function (req, res) {
  res.render('application.garnet');
});

// /* API end points - SENDER-SIDE */
// // Get all users of a tag by tag ID
// app.post('/get-all-users-tag', function (request, response) {
//   var params = [request.body.tagId];
//   var sqlString = 'SELECT emails.email FROM tags_emails INNER JOIN emails ' +
//                   'ON tags_emails.email_id=emails.email_id ' +
//                   'WHERE tag_id=($1)';
//   db.query(sqlString, params, function(err, res) {
//     if (err) {
//       console.log("ERROR");
//     } else {
//       console.log("SUCCESS");
//       var rows = res.rows;
//       console.log(rows);
//       response.writeHead(200, { 'Content-Type': 'application/json'});
//       response.end(JSON.stringify(rows));
//       response.end();
//     }
//   });
// });

// // Get all users of a tag by tag_name and org_domain
// app.post('/get-all-users-tag-org', function (request, response) {
//   var params = [request.body.tag, request.body.domain];
//   var sqlString = 'SELECT emails.email FROM emails ' +
//                   'INNER JOIN tags_emails ON emails.email_id=tags_emails.email_id ' +
//                   'INNER JOIN tags ON tags_emails.tag_id=tags.tag_id ' +
//                   'INNER JOIN organizations_tags ON organizations_tags.tag_id=tags.tag_id ' +
//                   'INNER JOIN organizations ON organizations_tags.organization_id=organizations.organization_id ' +
//                   'WHERE organizations.domain=($2) ' +
//                   'AND tags.name=($1)';
//   db.query(sqlString, params, function(err, res) {
//     if (err) {
//       console.log("ERROR");
//     } else {
//       console.log("SUCCESS");
//       var rows = res.rows;
//       console.log(rows);
//       response.writeHead(200, { 'Content-Type': 'application/json'});
//       response.end(JSON.stringify(rows));
//       response.end();
//     }
//   });
// });

// // Get number of users per tag
// app.post('/get-num-users-tag', function (request, response) {
//   var params = [request.body.tagId];
//   var sqlString = 'SELECT COUNT(*) FROM tags_emails ' +
//                   'WHERE tag_id=($1)';
//   db.query(sqlString, params, function(err, res) {
//     if (err) {
//       console.log("ERROR");
//     } else {
//       console.log("SUCCESS");
//       var rows = res.rows;
//       console.log(rows);
//       response.writeHead(200, { 'Content-Type': 'application/json'});
//       response.end(JSON.stringify(rows));
//       response.end();
//     }
//   });
// });

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
