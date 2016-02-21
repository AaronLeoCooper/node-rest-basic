var router = require('express').Router();

// Main frontend app entry
router.get( '/*', function(req, res) {
  res.render('front/public/index.html', {});
});

module.exports = router;
