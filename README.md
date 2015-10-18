# Pigeon

A mailing list solution for organizations.

## Development

Install dependencies by running `npm install`. You can run the server with `npm start`.

To automatically build changes to views, run

    $ watchify views/index.js -t babelify -o build/bundle.js
    $ npm start

and navigate to [http://localhost:5000/](localhost:5000).
