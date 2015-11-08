var bodyParser = require('body-parser');
var express = require('express');
var db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/lib'));
app.use('/', express.static(__dirname + '/public'));

app.get('*', function (req, res) {
  res.render('application.garnet');
});

/* API end points - GENERAL */
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

// Add user to organization
app.post('/add-user-to-org', function (req, res) {
  console.log("Adding user to organization...");
  var params1 = [req.body.email];
  var params2 = [req.body.email, req.body.orgId];
  console.log(params2);

  var sqlString1 = 'INSERT INTO emails (email) VALUES ($1)';
  var sqlString2 = 'INSERT INTO organizations_emails (organization_id, email_id) VALUES ' +
              '(($2), (SELECT email_id FROM emails WHERE email=($1)))';

  db.query(sqlString1, params1, function(err, res1) {
    if (err) {
      console.log("Error1");
    } else {
      console.log("Success1");
      db.query(sqlString2, params2, function(err, res2) {
        if (err) {
          console.log("Error2");
        } else {
          console.log("Success2");
        }
      })
    }
  })
});

// Add tag to organization
app.post('/add-tag-to-org', function (req, res) {
  console.log("Adding tag to organization...");
  var params1 = [req.body.tag, req.body.tagDesc];
  var params2 = [req.body.tag, req.body.orgId];
  console.log(params2);

  var sqlString1 = 'INSERT INTO tags (name, description) VALUES (($1), ($2))';
  var sqlString2 = 'INSERT INTO organizations_tags (organization_id, tag_id) VALUES ' +
              '(($2), (SELECT tag_id FROM tags WHERE name=($1)))';

  db.query(sqlString1, params1, function(err, res1) {
    if (err) {
      console.log("Error1");
    } else {
      console.log("Success1");
      db.query(sqlString2, params2, function(err, res2) {
        if (err) {
          console.log("Error2");
        } else {
          console.log("Success2");
        }
      })
    }
  })
});

// Remove organization
app.post('/remove-organization', function (req, res) {
  var params = [req.body.orgId];
  db.query('DELETE FROM organizations WHERE organization_id=($1)',
    params,
    function(err, res) {
      if (err) {
        console.log("ERROR");
      } else {
        console.log("SUCCESS");
      }
    });
});

// Remove user from organization
app.post('/remove-user-from-org', function (req, res) {
  var params = [req.body.emailId];
  var sqlString = 'DELETE FROM emails WHERE email_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("SUCCESS");
    }
  });
});

// Remove tag from organization
app.post('/remove-tag-from-org', function (req, res) {
  var params = [req.body.tagId];
  var sqlString = 'DELETE FROM tags WHERE tag_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("SUCCESS");
    }
  });
});

/* API end points - RECIPIENT-SIDE */
// Add user to tag
app.post('/add-user-to-tag', function (req, res) {
  var params = [req.body.tagId, req.body.emailId];
  var sqlString = 'INSERT INTO tags_emails (tag_id, email_id)' +
                  ' VALUES (($1), ($2))';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("SUCCESS");
    }
  });
});

// Remove user from tag
app.post('/remove-user-from-tag', function (req, res) {
  var params = [req.body.tagId, req.body.emailId];
  var sqlString = 'DELETE FROM tags_emails ' + 
                  'WHERE tag_id=($1) AND email_id=($2)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("SUCCESS");
    }
  });
});

/* API end points - SENDER-SIDE */
// Get all users of a tag
app.post('/get-all-users-tag', function (req, res) {
  var params = [req.body.tagId];
  var sqlString = 'SELECT emails.email FROM tags_emails INNER JOIN emails ' +
                  'ON tags_emails.email_id=emails.email_id ' +
                  'WHERE tag_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("SUCCESS");
      console.log(res);
    }
  });
});

// Get number of users per tag
app.post('/get-num-users-tag', function (req, res) {
  var params = [req.body.tagId];
  var sqlString = 'SELECT COUNT(*) FROM tags_emails ' + 
                  'WHERE tag_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("SUCCESS");
      console.log(res);
    }
  });
});

// var request = require('request');
// request.post({
//   url: 'http://localhost:5000/add-user-to-tag',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     tag: '2016',
//     user: 'student1@harvard.edu'
//   })
// }, function(error, response, body){
//   console.log(body);
// });

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
