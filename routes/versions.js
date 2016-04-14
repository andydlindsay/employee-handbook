var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
    res.render('templates/versionnew');
});

router.get('/list', function(req, res, next) {
    res.render('templates/versionlist');
});

module.exports = router;