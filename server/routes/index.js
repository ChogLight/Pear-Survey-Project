var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Pear Survey Builder' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Pear Survey Builder' });
});

module.exports = router;
