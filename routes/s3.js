var express = require('express');
var router = express.Router();

/*global AWS*/
// handle S3 
router.get('/transfer/:file', function(req, res, next) {
    // config s3 credentials
    console.log('Welcome to transfer');
    var s3OriginBucket      = 'andydlindsay-dev-eh-up';
    var s3DestinationBucket = 'andydlindsay-dev-eh-down';
    var s3BucketFolder      = 'img/instruction';
    var s3File              = req.params.file;
    var s3AccessKey         = 'AKIAILM2TWICQEQYYSQQ';
    var s3SecretKey         = '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';
    var s3Object            = {};
    var s3TransformedObject = {};
    console.log(s3File);
    
    AWS.config.update({
        accessKeyId: s3AccessKey,
        secretAccessKey: s3SecretKey
    });
    
    AWS.config.region = 'us-east-1';
    
    var s3 = new AWS.S3();
    
    var params = {
        Bucket: s3OriginBucket + '/' + s3BucketFolder,
        Key: s3File
    };
    
    var file = require('fs').createWriteStream('slash-s3.jpg');
    
    // retrieve the requested file from the provided bucket
    s3.getObject(params).createReadStream().pipe(file);
    console.log(s3Object);
    
    // transform the file
    s3TransformedObject = s3Object;
    // upload to final s3 bucket
    
    // delete file from original bucket
    
    // return s3TransformedObject;
});

router.get('/retrieve', function(req, res, next) {
    // retrieve the requested file
    
});

router.get('/delete', function(req, res, next) {
   // delete the requested file
    
});

module.exports = router;