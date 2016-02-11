var router = require('express').Router();

// Default route
router.get('/', function(req, res) {
  // fs.readFile(__dirname + '/json/users.json', 'utf8', function(err, data) {
  //   console.log(data);
  //   res.json(data);
  // });
  res.end("Sorry nothing here right now!");
});

// Custom routes
router.use( '/posts', require('./post') );
router.use( '/topics', require('./topic') );

module.exports = router;
