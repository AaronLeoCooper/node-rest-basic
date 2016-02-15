var router = require('express').Router();

// Default route
router.get('/', function(req, res) {
  res.end("Sorry nothing here right now!");
});

// Secure api routes
//router.use( '/api', require('./api') );

module.exports = router;
