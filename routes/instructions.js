var express = require('express');
var router = express.Router();

router.get('/instructionform', function(req, res, next) {
    res.render('directives/instructionform');
});

module.exports = router;