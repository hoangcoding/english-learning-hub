const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./api/v1/router');
const error = require('./middlewares/error');

const corsOptions = {
    exposedHeaders: 'authorization, x-refresh-token, x-token-expiry-time',
};

/**
 * Express instance
 * @public
 */

const server = express();

// parse body params and attach them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
server.use(compress());

// enable CORS - Cross Origin Resource Sharing
server.use(cors(corsOptions));

// mount api v1 routes
server.use('/v1', routes);

// secure servers by setting various HTTP headers
server.use(helmet());

// if error is not an instanceOf APIError, convert it.
server.use(error.converter);

// catch 404 and forward to error handler
server.use(error.notFound);

// error handler, send stacktrace only during development
server.use(error.handler);

module.exports = server;