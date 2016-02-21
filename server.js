// Heroku's config parameter HEROKU gets set when running on Heroku, otherwise assume locally running
GLOBAL.heroku = process.env.HEROKU || false;

var express = require('express'),
    app = express(),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser')
    fs = require('fs'),
    morgan = require('morgan'),
    partials = require('express-partials');

// General app configs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

// For admin views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());

// Use the passport package in our application
app.use(passport.initialize());

// Morgan for console logging requests
app.use(morgan('dev'));

// Import routes
app.use( '/', require('./app/routes') );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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

// Start the server!
if ( heroku ) {
  app.listen(process.env.PORT || 80);
}
else {
  app.listen(1111, function() {
    console.log('Test app listening at http://localhost:1111');
  });
}
