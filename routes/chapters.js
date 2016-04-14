var express = require('express');
var router = express.Router();

// GET chapters detail 
router.get('/new', function(req, res, next) {
    res.render('templates/chapternew'); 
});

router.get('/edit', function(req, res, next) {
    res.render('templates/chapteredit'); 
});

router.get('/', function(req, res, next) {
    res.render('templates/chapter'); 
});

module.exports = router;