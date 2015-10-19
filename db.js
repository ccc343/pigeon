var pg = require('pg');

var dbErrors = {
  NOT_NULL_VIOLATION: 23502,
  UNIQUE_VIOLATION: 23505
};

// Determine the database connection settings from the
// environment variables.
exports.databaseURL = process.env.DATABASE_URL;
if (!exports.databaseURL) {
  if (process.env.NODE_ENV === 'production') {
    console.error('Set the DATABASE_URL environment variable for production.');
    process.exit(1);
  } else {
    exports.databaseURL = 'postgres://localhost/pigeon'
  }
}

exports.test = function() {
  pg.connect(exports.databaseURL, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    console.log('Connected to postgres! Querying all tags');
    client.query('SELECT * FROM tags', function(err, result) {
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows);
    });
  });
}
