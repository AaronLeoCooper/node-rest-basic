var router = require('express').Router(),
    config = require('../../../_config'),
    passport = require('passport'),
    Post = require('./post'),
    Topic = require('./topic'),
    User = require('./user');
    initUser = require('./_initUser');

// Secure routes
router.use( '/posts', Post );
router.use( '/topics', Topic );
// router.use( '/users', User );

// Default route to frontend app
router.use( '/initbloguser', initUser );

module.exports = router;
