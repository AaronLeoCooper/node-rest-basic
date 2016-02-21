var router = require('express').Router(),
    config = require('../../../_config'),
    User = require('../../models/user');

// Login page
router.get( '/', function(req, res) {
  res.render('admin/login', {
    title: 'Admin Login'
  });
});

// Login page
router.post( '/login', function(req, res) {
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    // if (!user) {
    //   res.json({
    //     error: true,
    //     message: 'Authentication failed. User not found.'
    //   });
    // }
    // else if (user) {
    //
    //   user.comparePassword(req.body.password, function(err, isMatch) {
    //     if (err) throw err;
    //
    //     if ( isMatch ) {
    //       // if user is found and password is right create a token
    //       var token = jwt.sign({username: user.username}, config.sshhh, {
    //         expiresInMinutes: 1440 // expires in 24 hours
    //       });
    //
    //       // return the information including token as JSON
    //       res.json({
    //         error: false,
    //         message: 'Enjoy your token!',
    //         token: token
    //       });
    //     }
    //     else {
    //       res.json({
    //         error: true,
    //         message: 'Incorrect Username/Password combination',
    //       });
    //     }
    //   });
    //
    // }
  });
});

// Authentication
// router.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, config.sshhh, function(err, decoded) {
//       if (err) {
//         return res.json({
//           error: true,
//           message: 'Failed to authenticate token.'
//         });
//       }
//       else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   }
//   else {
//     // No token, return an error
//     return res.status(403).send({
//         error: true,
//         message: 'No token provided.'
//     });
//   }
// });

// Landing page
router.get( '/home', function(req, res) {
  res.render('admin/pages', {
    title: 'Admin Area'
  });
});

module.exports = router;
