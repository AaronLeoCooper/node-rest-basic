var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    fs = require('fs');

// Heroku's config parameter HEROKU gets set when running on Heroku, otherwise assume locally running
GLOBAL.heroku = process.env.HEROKU || false;

// General app configs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

// Import routes
app.use( '/', require('./routes/api') );

// Start the server!
if ( heroku ) {
  app.listen(process.env.PORT || 80);
}
else {
  app.listen(1111, function() {
    console.log('Test app listening at http://localhost:1111');
  });
}
