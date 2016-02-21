var router = require('express').Router(),
    User = require("../../models/user");

router.route('/')
  .get(function(req, res) { // GET all Users
    var result = {};
    User.find({}, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error fetching users data"
        };
      }
      else {
        result = {
          error: false,
          message: data
        };
      }
      res.json(result);
    });
  })
  .post(function(req, res) { // INSERT a User
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var db = new User();
      var result = {};
      db.name = req.body.name;
      db.username = req.body.username;
      db.password = req.body.password;

      db.save(function(err) {
        if ( err ) {
          result = {
            error: true,
            message: "Error inserting new user"
          };
        }
        else {
          result = {
            error: false,
            message: "New user inserted!"
          };
        }
        res.json(result);
      });
    }
  });

router.route('/:id')
  .get(function(req, res) { // GET a User
    var result = {};
    User.findById(req.params.id, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error fetching user data"
        };
      }
      else {
        result = {
          error: false,
          message: data
        };
      }
      res.json(result);
    });
  })
  .put(function(req, res) { // UPDATE a User
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var result = {};
      User.findById(req.params.id, function(err, data) {
        if ( err ) {
          result = {
            error: true,
            message: "Error inserting new user"
          };
        }
        else if ( !data ) {
          result = {
            error: false,
            message: "Hmm.. Couldn't find that user"
          }
        }
        else {
          var wasChanged = false;

          if ( req.body.name ) data.name = req.body.name, wasChanged = true;
          if ( req.body.username ) data.username = req.body.username, wasChanged = true;
          if ( req.body.password ) data.password = req.body.password, wasChanged = true;

          // Only attempt db.save() if something was changed about the User
          if ( wasChanged ) {
            data.save(function(err) {
              if ( err ) {
                result = {
                  error: true,
                  message: "Error inserting new user"
                };
              }
              else {
                result = {
                  error: false,
                  message: "User updated!"
                };
              }
            });
          }
          else {
            result = {
              error: false,
              message: "User not affected, nothing was changed"
            }
          }
        }
      }).then(function() {
        res.json(result);
      });
    }
  })
  .delete(function(req, res) { // DELETE a User
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var result = {};
      User.findById(req.params.id, function(err, data) {
        if ( err ) {
          result = {
            error: true,
            message: "Error fetching data"
          };
        }
        else {
          // No errors, delete the user
          User.remove({_id : req.params.id}, function(err) {
            if ( err ) {
              result = {
                error: true,
                message: "Error deleting data"
              };
            }
            else {
              result = {
                error : false,
                message : "User "+req.params.id+" was deleted"
              };
            }
          }).then(function() {
            res.json(result);
          });
        }
      });
    }
  });


module.exports = router;
