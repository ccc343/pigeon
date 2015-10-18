# Pigeon

A mailing list solution for organizations.

## Development

Install dependencies by running

    $ npm install
    $ sudo npm install -g browserify watchify


To automatically build changes to views, run

    $ watchify views/index.js -t babelify -o build/bundle.js

To manually build changes to views, run

    $ browserify views/index.js -t babelify -o build/bundle.js

To start the server, run `npm start` and navigate to [localhost:5000](http://localhost:5000).
