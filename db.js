var pg = require('pg');

exports.NOT_NULL_VIOLATION = 23502;
exports.UNIQUE_VIOLATION = 23505;

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

// Handle a databse query with the given query string and
// parameters. <callback> should be a function that takes
// error and result as parameters.
exports.query = function(text, params, callback) {
  pg.connect(exports.databaseURL, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query(text, params, function(err, result) {
      // release the client back to the pool
      done();
      if(err) {
        return callback(err);
      }
      callback(null, result);
    });
  });
}
