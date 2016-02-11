// Import custom Mongoose setup
var mongoose = require('./_mongoosedb');

// Create schema
var topicSchema = new mongoose.Schema({
  "name": String,
  "description": String,
  "colour": String,
  "bgColour": String,
  "fontSize": String,
  "shape": String,
});

// Create model if it doesn't already exist
module.exports = mongoose.model('topic', topicSchema);
