var router = require('express').Router(),
    slug = require('slug'),
    auth = require('./_auth').isAuthenticated,
    Post = require("../../models/post"),
    Topic = require("../../models/topic");

router.route('/')
  .get(auth, function(req, res) { // GET all Posts
    var result = {};
    Post.find({}, function(err, data) {
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
  .post(auth, function(req, res) { // INSERT a Post
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var db = new Post();
      var result = {};
      db.title = req.body.title;
      db.intro = req.body.intro;
      db.content = req.body.content;
      db.slug = req.body.slug || slug(req.body.title);
      db.imageHeader = req.body.imageHeader;

      db.topics = req.body.topics;
      db.tags = req.body.tags;

      // Date.now is the default field value set in Schema
      // db.dateUpdated = new Date();

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
    }
  });

router.route('/:id')
  .get(auth, function(req, res) { // GET a Post
    var result = {};
    Post.findById(req.params.id, function(err, data) {
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
  .put(auth, function(req, res) { // UPDATE a Post
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var result = {};
      Post.findById(req.params.id, function(err, data) {
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

          if ( req.body.title ) data.title = req.body.title, wasChanged = true;
          if ( req.body.intro ) data.intro = req.body.intro, wasChanged = true;
          if ( req.body.content ) data.content = req.body.content, wasChanged = true;
          if ( req.body.slug ) data.slug = req.body.slug, wasChanged = true;
          if ( req.body.topics ) data.topics = req.body.topics, wasChanged = true;
          if ( req.body.imageHeader ) data.imageHeader = req.body.imageHeader;

          if ( req.body.topics ) data.topics = req.body.topics;
          if ( req.body.tags ) data.tags = req.body.tags;

          // If adding a topic to the array individually (uniquely):
          //if ( req.body.topics ) data.topics.addToSet(req.body.topics), wasChanged = true;

          // Only attempt data.save() if something was changed about the Post
          if ( wasChanged ) {
            data.dateUpdated = new Date();

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
                  message: "Post updated!"
                };
              }
            });
          }
          else {
            result = {
              error: false,
              message: "Post not affected, nothing was changed"
            }
          }
        }
      }).then(function() {
        res.json(result);
      });
    }
  })
  .delete(auth, function(req, res) { // DELETE a Post
    if ( heroku ) {
      res.end("Sorry, can't do that.");
    }
    else {
      var result = {};
      Post.findById(req.params.id, function(err, data) {
        if ( err ) {
          result = {
            error: true,
            message: "Error fetching data"
          };
        }
        else {
          // No errors, delete the post
          Post.remove({_id : req.params.id}, function(err) {
            if ( err ) {
              result = {
                error: true,
                message: "Error deleting data"
              };
            }
            else {
              result = {
                error : false,
                message : "Post "+req.params.id+" was deleted"
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
