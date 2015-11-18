var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = "845843206204-so6m70el9a2kmc6vukhkvjll296vcpl3.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET="8jFzCXpxs-bFtvLXi_bfgSZ3";
var models = require('./models/models');
var db = require('./db');

// AlchemyAPI used for content tagging of emails
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

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

// called only during initial session authentication
// just stores the user email in the session
passport.serializeUser(function(user, done) {
  done(null, user.emails[0].value);
});

// called on every request during the session
// gets the user associated with the session email
passport.deserializeUser(function(email, done) {
  models.User.where({ email: email })
    .fetch()
    .then(function(user) {
      done(null, user);
    })
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      done(null, profile);  
    });
  }
));

var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'howtogeneratethis idk needs to be hidden tho',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/lib'));
app.use('/', express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

app.use(allowCrossDomain);

require('./routes/user').config(app);
require('./routes/organization').config(app);
require('./routes/tag').config(app);

app.get('*', function (req, res) {
  res.render('application.garnet');
});


// Remove organization
app.post('/remove-organization', function (request, response) {
  var params = [request.body.orgId];
  db.query('DELETE FROM organizations WHERE organization_id=($1)',
    params,
    function(err, res) {
      if (err) {
        console.log("ERROR");
        response.sendStatus(500);
      } else {
        console.log("SUCCESS");
        response.sendStatus(200);
      }
    });
});

// Remove user from organization
app.post('/remove-user-from-org', function (request, response) {
  var params = [request.body.emailId];
  var sqlString = 'DELETE FROM emails WHERE email_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
      response.sendStatus(500);
    } else {
      console.log("SUCCESS");
      response.sendStatus(200);
    }
  });
});

// Remove tag from organization
app.post('/remove-tag-from-org', function (request, response) {
  var params = [request.body.tagId];
  var sqlString = 'DELETE FROM tags WHERE tag_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
      response.sendStatus(500);
    } else {
      console.log("SUCCESS");
      response.sendStatus(200);
    }
  });
});


/* API end points - SENDER-SIDE */
// Get all users of a tag by tag ID
app.post('/get-all-users-tag', function (request, response) {
  var params = [request.body.tagId];
  var sqlString = 'SELECT emails.email FROM tags_emails INNER JOIN emails ' +
                  'ON tags_emails.email_id=emails.email_id ' +
                  'WHERE tag_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
      response.sendStatus(500);
    } else {
      console.log("SUCCESS");
      var rows = res.rows;
      console.log(rows);
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(rows));
      response.end();
    }
  });
});

// Get all users of a tag by tag_name and org_domain
app.post('/get-all-users-tag-org', function (request, response) {
  var params = [request.body.tag, request.body.domain];
  var sqlString = 'SELECT users.email FROM users ' + 
                  'INNER JOIN tags_users ON users.id=tags_users.user_id ' + 
                  'INNER JOIN tags ON tags.id=tags_users.tag_id ' +
                  'WHERE tags.name=($1) ' +
                  'AND tags.organization_id=(SELECT id FROM organizations ' +
                  'WHERE domain=($2));'
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
      response.sendStatus(500);
    } else {
      console.log("SUCCESS");
      var rows = res.rows;
      console.log(rows);
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(rows));
      response.end();
    }
  });
});

// Get the union of all users subscribed to tags in this org_domain
app.post('/get-union-users-tag-org', function (request, response) {
  var params = [request.body.domain];
  var tags = request.body.tags;
  for (var j = 0; j < tags.length; j++) {
    var element = tags[j];
    params.push(element);
  }
  console.log(params);
  var sqlString = 'SELECT DISTINCT users.email FROM users ' + 
                  'INNER JOIN tags_users ON users.id=tags_users.user_id ' + 
                  'INNER JOIN tags ON tags.id=tags_users.tag_id ' +
                  'WHERE tags.organization_id=(SELECT id FROM organizations ' +
                  'WHERE domain=($1)) ' +
                  'AND (tags.name=';
                  
  for (var i = 0; i < tags.length; i++) {
    sqlString += '($' + (i+2) + ')';
    if (i < tags.length-1) {
      sqlString += ' OR tags.name=';
    }
  }
  sqlString += ')';
  console.log(sqlString);
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
      response.sendStatus(500);
    } else {
      console.log("SUCCESS");
      var rows = res.rows;
      console.log(rows);
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(rows));
      response.end();
    }
  });
});

// Get number of users per tag
app.post('/get-num-users-tag', function (request, response) {
  var params = [request.body.tagId];
  var sqlString = 'SELECT COUNT(*) FROM tags_emails ' +
                  'WHERE tag_id=($1)';
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log("ERROR");
      response.sendStatus(500);
    } else {
      console.log("SUCCESS");
      var rows = res.rows;
      console.log(rows);
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(rows));
      response.end();
    }
  });
});

// Suggest the tags to the user
app.post('/suggest-tags', function (request, response) {
  var emailText = request.body.email;
  var topics = [];
  alchemyapi.concepts("text", emailText, {maxRetrieve: 10}, function(res) {
    for (var i = 0; i < res['concepts'].length; i++) {
      topics.push({
                          "topic": res['concepts'][i]['text'], 
                          "relevance": res['concepts'][i]['relevance']
                        });
    }
    console.log(topics);
    // parse those potential topics to find the actual tags
    // ALGORITHM HERE

    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(topics));
    response.end();
  });
});

// var request = require('request');
// request.post({
//   url: 'http://localhost:5000/get-union-users-tag-org',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     domain: 'princeton.edu',
//     tags: ['whitman', 'mathey', '2016']
//   })
// }, function(error, response, body){
//   //console.log(body);
// });

// test alchemy
// var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my app!";
// alchemyapi.concepts("text", myText, {maxRetrieve: 10}, function(response) {
//   var potentialTags = [];
//   for (var i = 0; i < response['concepts'].length; i++) {
//     potentialTags.push({
//                         "tag": response['concepts'][i]['text'], 
//                         "relevance": response['concepts'][i]['relevance']
//                       });
//   }
//   console.log(potentialTags);
// });

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port %d.', server.address().port);
});
