// Determine the database connection settings from the
// environment variables.
var databaseURL = process.env.DATABASE_URL;
if (!databaseURL) {
  if (process.env.NODE_ENV === 'production') {
    console.error('Set the DATABASE_URL environment variable for production.');
    process.exit(1);
  } else {
    databaseURL = 'postgres://postgres:password@localhost/pigeon';
  }
}

var knex = require('knex')({
  client: 'pg',
  connection: databaseURL
});

module.exports = require('bookshelf')(knex);
