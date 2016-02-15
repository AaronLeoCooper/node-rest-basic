var mongoose = require('mongoose'),
    config = require('../../_config');

mongoose.connect(config.database, function(err, res) {
  if ( err ) {
    console.log("Error connecting to: "+config.database+". "+err);
  }
  else {
    console.log("Connected to: "+config.database);
  }
});

module.exports = mongoose;
