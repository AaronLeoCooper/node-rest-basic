// Import custom Mongoose setup
var mongoose = require('./_mongoosedb');

// Create schema
var postSchema = new mongoose.Schema({
  "title": String,
  "intro": String,
  "content": String,
  "slug": String,
  "imageHeader": String,
  "dateUpdated": {
    default: Date.now,
    type: Date
  },
  "topics": [String],
  "tags": [String],
  "comments": [String],
  "online": Boolean,
});

// Create model if it doesn't already exist
module.exports = mongoose.model('Post', postSchema);
