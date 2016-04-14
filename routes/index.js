var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // query the database for company information to populate the navbar and page title
  res.render('index', { title: 'Employee Handbook' });
});

router.get('/home', function(req, res, next) {
    res.render('templates/home');
});

router.get('/about', function(req, res, next) {
    res.render('templates/about');
});

router.get('/test', function(req, res, next) {
    res.render('templates/test');
});

module.exports = router;
