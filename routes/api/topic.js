var router = require('express').Router(),
    Topic = require("../../models/topic");

router.route('/')
  .get(function(req, res) { // GET all Topics
    var result = {};
    Topic.find({}, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error fetching posts data"
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
    var db = new Topic();
    var result = {};
    db.name = req.body.name;
    db.description = req.body.description;
    db.color = req.body.color;
    db.bgColor = req.body.bgColor;
    db.fontSize = req.body.fontSize;
    db.shape = req.body.shape;
    db.save(function(err) {
      if ( err ) {
        result = {
          error: true,
          message: "Error inserting new post"
        };
      }
      else {
        result = {
          error: false,
          message: "New post inserted!"
        };
      }
      res.json(result);
    });
  });

router.route('/:id')
  .get(function(req, res) { // GET a Topic
    var result = {};
    Topic.findById(req.params.id, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error fetching post data"
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
    var result = {};
    Topic.findById(req.params.id, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error inserting new post"
        };
      }
      else if ( !data ) {
        result = {
          error: false,
          message: "Hmm.. Couldn't find that post"
        }
      }
      else {
        var wasChanged = false;

        if ( req.body.name ) data.name = req.body.name, wasChanged = true;
        if ( req.body.description ) data.description = req.body.description, wasChanged = true;
        if ( req.body.color ) data.color = req.body.color, wasChanged = true;
        if ( req.body.bgColor ) data.bgColor = req.body.bgColor, wasChanged = true;
        if ( req.body.fontSize ) data.fontSize = req.body.fontSize, wasChanged = true;
        if ( req.body.shape ) data.shape = req.body.shape, wasChanged = true;

        // Only attempt db.save() if something was changed about the Topic
        if ( wasChanged ) {
          data.save(function(err) {
            if ( err ) {
              result = {
                error: true,
                message: "Error inserting new post"
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
  })
  .delete(function(req, res) { // DELETE a Topic
    var result = {};
    Topic.findById(req.params.id, function(err, data) {
      if ( err ) {
        result = {
          error: true,
          message: "Error fetching data"
        };
      }
      else {
        // No errors, delete the post
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
  });


module.exports = router;
