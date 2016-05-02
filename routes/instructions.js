var express = require('express');
var router = express.Router();

router.get('/instructionform', function(req, res, next) {
    res.render('directives/instructionform');
});

router.get('/list', function(req, res, next) {
    res.render('templates/instruction/list'); 
});

module.exports = router;