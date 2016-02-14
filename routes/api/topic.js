var router = require('express').Router(),
    Topic = require("../../models/topic");

router.route('/')
  .get(function(req, res) { // GET all Topics
    var result = {};
    Topic.find({}, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error fetching topics data"
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
  .post(function(req, res) { // INSERT a Topic
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var db = new Topic();
      var result = {};
      db.name = req.body.name;
      db.description = req.body.description;
      db.colour = req.body.colour;
      db.bgColor = req.body.bgColor;
      db.fontSize = req.body.fontSize;
      db.shape = req.body.shape;
      db.save(function(err) {
        if ( err ) {
          result = {
            error: true,
            message: "Error inserting new topic"
          };
        }
        else {
          result = {
            error: false,
            message: "New topic inserted!"
          };
        }
        res.json(result);
      });
    }
  });

router.route('/:id')
  .get(function(req, res) { // GET a Topic
    var result = {};
    Topic.findById(req.params.id, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error fetching topic data"
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
  .put(function(req, res) { // UPDATE a Topic
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var result = {};
      Topic.findById(req.params.id, function(err, data) {
        if ( err ) {
          result = {
            error: true,
            message: "Error inserting new topic"
          };
        }
        else if ( !data ) {
          result = {
            error: false,
            message: "Hmm.. Couldn't find that topic"
          }
        }
        else {
          var wasChanged = false;

          if ( req.body.name ) data.name = req.body.name, wasChanged = true;
          if ( req.body.description ) data.description = req.body.description, wasChanged = true;
          if ( req.body.colour ) data.colour = req.body.colour, wasChanged = true;
          if ( req.body.bgColor ) data.bgColor = req.body.bgColor, wasChanged = true;
          if ( req.body.fontSize ) data.fontSize = req.body.fontSize, wasChanged = true;
          if ( req.body.shape ) data.shape = req.body.shape, wasChanged = true;

          // Only attempt db.save() if something was changed about the Topic
          if ( wasChanged ) {
            data.save(function(err) {
              if ( err ) {
                result = {
                  error: true,
                  message: "Error inserting new topic"
                };
              }
              else {
                result = {
                  error: false,
                  message: "Topic updated!"
                };
              }
            });
          }
          else {
            result = {
              error: false,
              message: "Topic not affected, nothing was changed"
            }
          }
        }
      }).then(function() {
        res.json(result);
      });
    }
  })
  .delete(function(req, res) { // DELETE a Topic
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var result = {};
      Topic.findById(req.params.id, function(err, data) {
        if ( err ) {
          result = {
            error: true,
            message: "Error fetching data"
          };
        }
        else {
          // No errors, delete the topic
          Topic.remove({_id : req.params.id}, function(err) {
            if ( err ) {
              result = {
                error: true,
                message: "Error deleting data"
              };
            }
            else {
              result = {
                error : false,
                message : "Topic "+req.params.id+" was deleted"
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
