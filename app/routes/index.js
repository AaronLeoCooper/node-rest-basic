var router = require('express').Router();

// Secure api routes
router.use( '/api', require('./api') );

// Admin routes
router.use( '/admin', require('./admin') );

// Default route to frontend app
router.use( '/', require('./front') );

module.exports = router;
