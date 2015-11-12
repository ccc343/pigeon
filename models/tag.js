'use strict';

var db = require('../db');

class Tag {

  constructor(name, description) {

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
