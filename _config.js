// Select the URI depending on if running on Heroku or locally
var uriString;
if ( heroku ) {
  uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost';
}
else {
  uriString = 'mongodb://localhost:27017/test_blog_db';
}

module.exports = {
  'sshhh': '8ea4fbac9fd61c286e718b4fa0636b577fa51627d1e27d506f9adafb8507bcdc', // SHA-256 Hash of charmainefoo88
  'database': uriString
};
