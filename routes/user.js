'use strict';

var db = require('../db');

var currentUser = {
  id: 1
};

exports.config = function(app) {

  // Subscribes the current user to the tag.
  // @param {Number} tagId
  app.post('/api/subscribe', function(req, res) {
    const sql = 'INSERT INTO tags_emails (tag_id, email_id) \
                 VALUES (($1), ($2))';
    const params = [req.body.tagId, currentUser.id];

    db.query(sql, params, (err, result) => {
      if (err) {
        return res.sendStatus(500);
      }

      // seems to be an issue with xr that we can't send status...
      // res.sendStatus(200);
      res.json({success:true});
    });
  });

  // Unsubscribes the current user to the tag.
  // @param {Number} tagId
  app.post('/api/unsubscribe', function(req, res) {
    const sql = 'DELETE FROM tags_emails WHERE tag_id=($1) AND email_id=($2)';
    const params = [req.body.tagId, currentUser.id];

    db.query(sql, params, (err, result) => {
      if (err) {
        return res.sendStatus(500);
      }

      // res.sendStatus(200);
      res.json({success:true});
    });
  });

  // Signs in the user and sets as currentUser.
  // @param {String} email
  // TODO: we need to authorize the signin, maybe with a session token
  //       after user signs in with Google.
  app.post('/api/signin', function(req, res) {
    console.log("signing in: " + req.body.email);

    const sql1 = 'SELECT email_id FROM emails WHERE email=($1)';
    const params1 = [req.body.email];
    db.query(sql1, params1, (err, result) => {
      if (err) return res.json({ success: false, message: err });

      currentUser.id = result.rows[0] ? result.rows[0].email_id : null;

      // Populate currentUser if this user exists.
      if (currentUser.id) {

        // Get the user's organization.
        const sql2 = 'SELECT organization_id \
                      FROM organizations WHERE domain=($1)';
        const params2 = [req.body.email.split('@')[1]];
        db.query(sql2, params2, (err, result) => {
          if (err) return console.error(err);
          return res.json({
            organizationId: result.rows[0].organization_id
          });
        });
      }

      else {
        console.log('user does not exist');
      }
    });
  });

  // Returns an array of tag_id's to which the user is subscribed.
  app.get('/api/tags/subscribed', function(req, res) {
    if (!currentUser.id) {
      res.json({ success: false, message: "User is not logged in." });
    }

    const sql = 'SELECT tags.tag_id FROM tags INNER JOIN \
                (SELECT tag_id FROM tags_emails WHERE email_id=($1)) AS tr \
                ON (tags.tag_id=tr.tag_id)';
    const params = [currentUser.id];
    db.query(sql, params, (err, result) => {
        if (err) {
          return res.sendStatus(500);
        }

        const ids = result.rows.map(item => item.tag_id);
        res.json({ data: ids });
      }
    );
  });

}
