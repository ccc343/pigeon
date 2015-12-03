var db = require('../db');
var AlchemyAPI = require('../lib/js/alchemyapi');

var alchemyapi = new AlchemyAPI();

// Finds tags in this organization that contain the concept word in the name
// or the description of the tag. Returns array of such tags.
findTagsWithConcept = function(concept) {
  var tags = [];
  var sqlString = 'SELECT name FROM tags WHERE description ILIKE "%($1)%"';
  var params = [concept];
  db.query(sqlString, params, function(err, res) {
    if (err) {
      console.log('Error');
    } else {
      console.log('Success');
      tags = res.rows;
      console.log(tags);
    }
    return tags;
  });
}

exports.config = function(app) {
  // Allows cross domain requests.
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

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
    var tags = [];
    // Get list of concepts from Alchemy API
    alchemyapi.concepts("text", emailText, {maxRetrieve: 5}, function(res) {
      var concepts = res['concepts'];
      // If no concepts...
      if (concepts.length == 0 || concepts == null) {
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify(tags));
        response.end();
        return;
      }
      var params = [];
      // Construct SQL query to find all relevant tags from these concepts
      var sqlString = "SELECT name FROM tags WHERE";
      for (var i = 0; i < concepts.length; i++) {
        if (i > 0) sqlString += " OR";
        sqlString += " description ILIKE '%" + concepts[i]['text'] + "%'"; 
      }
      console.log(sqlString);
      // Query for all tags that are related to these concepts
      var tagRows;
      db.query(sqlString, params, function(err, res2) {
        if (err) {
          console.log('Error');
          response.sendStatus(500);
        } else {
          console.log('Success');
          tagRows = res2.rows;
          for (var j = 0; j < tagRows.length; j++) {
            console.log(tagRows[j].name);
            tags.push({
              "tag": tagRows[j].name
            });
          }
          console.log("tags....");
          console.log(tags);
          response.writeHead(200, { 'Content-Type': 'application/json'});
          response.end(JSON.stringify(tags));
          response.end();
        }
      });
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
}
