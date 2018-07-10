

/**
 * Bootstrap file
 */

const express = require('express');
const config = require('config');
const passport = require('passport');
const path = require('path');

require('http-errors-promise').config({
  logLevel: config.errorLogLevel
});

const app = express();

app.use(config.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.set('offset', config.subdomainOffset);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

require('./areas/assembly')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).end();
});

module.exports = app;
