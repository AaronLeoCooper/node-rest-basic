var router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    config = require('../../../_config');

// Authentication
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if ( token === config.sshhh ) {
    next();
  }
  else {
    return res.status(403).end("Sorry, you're not allowed here.");
  }

  // // decode token
  // if (token) {
  //   // verifies secret and checks exp
  //   jwt.verify(token, config.sshhh, function(err, decoded) {
  //     if (err) {
  //       return res.json({ success: false, message: 'Failed to authenticate token.' });
  //     }
  //     else {
  //       // if everything is good, save to request for use in other routes
  //       req.decoded = decoded;
  //       next();
  //     }
  //   });
  // }
  // else {
  //   // if there is no token
  //   // return an error
  //   return res.status(403).send({
  //       success: false,
  //       message: 'No token provided.'
  //   });
  // }
});

router.get( '/', function(req, res) {
  res.end("Are you really supposed to be here?");
});

// Custom routes
router.use( '/posts', require('./post') );
router.use( '/topics', require('./topic') );

module.exports = router;
