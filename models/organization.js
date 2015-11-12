'use strict';

var db = require('../db');

class Organization {

  constructor(domain, name, description) {
    name = name || '';
    description = description || '';

    const sql = 'INSERT INTO organizations (domain, name, description) \
                VALUES (($1), ($2), ($3))';
    const params = [domain, name, description];
    db.query(sql, params, (err, result) => {
      if (err) {
        if (err.code == db.UNIQUE_VIOLATION) {
          this.getProperties(domain);
        } else {
          return console.error(err);
        }
      } else {
        this.getProperties(domain);
      }
    });
  }

  getProperties(domain) {
    const sql = 'SELECT * FROM organizations WHERE domain=($1) LIMIT 1';
    const params = [domain];
    db.query(sql, params, (err, result) => {
      if (err) {
        return console.error(err);
      }

      const org = result.rows[0];
      this.id = org.organization_id;
      this.domain = org.domain;
      this.name = org.name;
      this.description = org.description;
    });
  }

  addTag(tagId, next) {
    const sql = 'INSERT INTO organizations_tags (organization_id, tag_id) \
                VALUES (($1), ($2))';
    const params = [this.id, tagId];
    db.query(sql, params, (err, result) => {
      if (err) {
        return next(err);
      }

      next();
    });
  }

  getAllTags(next) {
    const sql = 'SELECT tags.tag_id, tags.name, tags.description \
                FROM tags INNER JOIN \
                (SELECT tag_id FROM organizations_tags WHERE organization_id=($1)) AS tr \
                ON (tags.tag_id = tr.tag_id)';
    const params = [this.id];
    db.query(sql, params, (err, result) => {
        if (err) {
          return next(err);
        }

        next(null, result.rows);
      }
    );
  }

}

module.exports = Organization;
