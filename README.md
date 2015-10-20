# Pigeon

A mailing list solution for organizations.

## Dependencies

- [PostgreSQL](http://www.postgresql.org/)
- [Node.js](http://nodejs.org/)

## Development

Install dependencies by running

    $ npm install
    $ sudo npm install -g browserify watchify

To start the server, run `npm start` and navigate to [localhost:5000](http://localhost:5000).

To build changes to views automatically, run

    $ watchify views/index.js -t babelify -o build/bundle.js

Alternatively, you can build changes to views manually with

    $ browserify views/index.js -t babelify -o build/bundle.js

Local development should be done with a local Postgres database. Make sure you have installed Postgres, then run

    $ createdb pigeon
    $ psql pigeon < ./schema.sql
