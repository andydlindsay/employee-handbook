var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
    res.render('templates/versionnew');
});

router.get('/list', function(req, res, next) {
    res.render('templates/versionlist');
});

router.get('/edit', function(req, res, next) {
    res.render('templates/versionedit'); 
});

router.get('/', function(req, res, next) {
    res.render('templates/version'); 
});

module.exports = router;