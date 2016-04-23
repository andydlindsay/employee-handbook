var express           = require('express');
var path              = require('path');
var favicon           = require('serve-favicon');
var logger            = require('morgan');
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var passport          = require('passport');
var jwt               = require('jwt-simple');
var AWS               = require('aws-sdk');

var app               = express();

// include environment variables
require('dotenv').config();

var routes            = require('./routes/index');
var userRoute         = require('./routes/users');
var apiRoute          = require('./routes/api');
var chapterRoute      = require('./routes/chapters');
var sectionRoute      = require('./routes/sections');
var procedureRoute    = require('./routes/procedures');
var instructionRoute  = require('./routes/instructions');
var versionRoute      = require('./routes/versions');
var s3Route           = require('./routes/s3');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');
app.set('models', require("./models"));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use the passport package
app.use(passport.initialize());

// file routing
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/assets', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/app'));

// routing
app.use('/', routes);
app.use('/api', apiRoute);
app.use('/chapter', chapterRoute);
app.use('/section', sectionRoute);
app.use('/procedure', procedureRoute);
app.use('/instruction', instructionRoute);
app.use('/version', versionRoute);
app.use('/users', userRoute);
app.use('/s3', s3Route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;