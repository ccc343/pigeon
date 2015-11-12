'use strict';

var db = require('../db');

exports.User = class User {

  constructor(email, next) {
    const sql = 'INSERT INTO emails (email) VALUES ($1)';
    const params = [email];
    db.query(sql, params, (err, result) => {
      if (err) {
        if (err.code == db.UNIQUE_VIOLATION) {
          this.getProperties(email, next);
        } else {
          next(err);
        }
      } else {
        this.getProperties(email, next);
      }
    });
  }

  getProperties(email, next) {
    const sql = 'SELECT * FROM emails WHERE email=($1) LIMIT 1';
    const params = [email];
    db.query(sql, params, (err, result) => {
      if (err) {
        return next(err);
      }

      const user = result.rows[0];
      this.id = user.email_id;
      this.email = email;

      next();
    });
  }

}
