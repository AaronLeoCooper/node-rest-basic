// Import custom Mongoose setup
var mongoose = require('./_mongoosedb');

// Create schema
var topicSchema = new mongoose.Schema({
  "name": String,
  "description": String,
  "colour": String,
  "bgColour": String,
  "fontSize": {
    default: "100%",
    type: String
  },
  "shape": {
    default: "circle",
    type: String
  },
});

// Create model if it doesn't already exist
module.exports = mongoose.model('Topic', topicSchema);
