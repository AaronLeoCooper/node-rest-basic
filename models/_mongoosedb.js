var mongoose = require('mongoose'),
    uriString;

// Select the URI depending on if running on Heroku or locally
if ( heroku ) {
  uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost';
}
else {
  uriString = 'mongodb://localhost:27017/test_blog_db';
}

mongoose.connect(uriString, function(err, res) {
  if ( err ) {
    console.log("Error connecting to: "+uriString+". "+err);
  }
  else {
    console.log("Connected to: "+uriString);
  }
});

module.exports = mongoose;
