var express = require('express');
var router = express.Router();

// GET section detail 
router.get('/edit', function(req, res, next) {
    res.render('templates/procedureedit');
});

router.get('/new', function(req, res, next) {
    res.render('templates/procedurenew');
});

router.get('/', function(req, res, next) {
    res.render('templates/procedure'); 
});

module.exports = router;