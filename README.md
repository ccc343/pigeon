# Pigeon

A mailing list solution for organizations.

## Dependencies

- [PostgreSQL](http://www.postgresql.org/)
- [Node.js](http://nodejs.org/)
- [Sass](http://sass-lang.com/)

## Development

Install dependencies by running

    $ npm install
    $ sudo npm install -g browserify watchify
    $ sudo gem install sass

To start the server, run `npm start` and navigate to [localhost:5000](http://localhost:5000).

To build changes to views automatically, run

    $ watchify views/index.js --extension=.jsx -t babelify -o build/bundle.js
    $ sass --watch styles/style.scss:build/style.css

Alternatively, you can build changes to views manually with

    $ browserify views/index.js --extension=.jsx -t babelify -o build/bundle.js
    $ sass styles/style.scss:build/style.css

Local development should be done with a local Postgres database. Make sure you have installed Postgres, then run the following commands in the root directory of the repo.

    $ createdb pigeon
    $ psql pigeon < ./schema.sql
