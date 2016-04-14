var express = require('express');
var router = express.Router();

// GET section detail 
router.get('/new', function(req, res, next) {
    res.render('templates/sectionnew');
});

router.get('/edit', function(req, res, next) {
    res.render('templates/sectionedit');
});

router.get('/', function(req, res, next) {
    res.render('templates/section'); 
});

module.exports = router;