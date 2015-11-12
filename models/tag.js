'use strict';

var db = require('../db');

class Tag {

  constructor(id, next) {
    const sql = 'SELECT * FROM tags WHERE tag_id=($1) LIMIT 1';
    const params = [id];
    db.query(sql, params, (err, result) => {
      if (err) {
        return next(err);
      }

      const tag = result.rows[0];
      this.id = tag.tag_id;
      this.name = tag.name;
      this.description = tag.description;
      next(null, tag);
    });
  }

  getUsers(next) {
    const sql = 'SELECT emails.email FROM emails INNER JOIN \
                (SELECT email_id FROM tags_emails WHERE tag_id=($1)) AS ids \
                ON (emails.email_id=ids.email_id)';
    const params = [this.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        return next(err);
      }

      return next(null, result.rows.map(item => item.email));
    });
  }

}

Tag.create = function(name, description, next) {
  const sql = 'INSERT INTO tags (name, description) VALUES (($1), ($2)) \
              RETURNING tag_id';
  const params = [name, description];
  db.query(sql, params, (err, result) => {
    if (err) {
      return next(err);
    }

    next(null, result.rows[0].tag_id);
  });
}

module.exports = Tag;
