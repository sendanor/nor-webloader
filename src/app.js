/*
 * Simple webserver which shows a temporary loader.
 */

var debug = require('nor-debug');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/* Production error handler -- no stacktraces leaked to user */
app.use(function(err, req, res, next) {
	debug.error(err);

	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;

/* EOF */
