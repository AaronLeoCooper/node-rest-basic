var router = require('express').Router(),
    auth = require('./_auth').isAuthenticated,
    User = require('../../models/user'),
    // auth = require('./_auth'),
    blogUser = require('../../../_config').blogUser;

router.route('/')
  .get(function(req, res) {
    User.findOne({ username: blogUser.username }, function (err, user) {
      var result = {};

      // No user found with that username
      if (!user) {
        var saveUser = new User(blogUser);

        // save user to database
        saveUser.save(function(err) {
          result = {
            error: false,
            message: "Added blog user!"
          };
        });
      }
      else {
        result = {
          error: false,
          message: "Blog user already exists."
        };
      }

      res.json(result);
    });
  });

module.exports = router;
