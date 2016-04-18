/*global angular*/
angular.module('controllers')

.controller('versionList', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('/api/versions/' + $routeParams.proid)
    .then(function(response) {
        $scope.versions = response.data;
    });
}])

.controller('versionEdit', ['$routeParams', '$http', '$window', '$scope',  'getVers', function($routeParams, $http, $window, $scope, getVersion) {
    var id = getVersion.id;
    var number = getVersion.number;
    var title = getVersion.title;
    var effectiveDate = getVersion.effectiveDate;
    var reviewDate = getVersion.reviewDate;
    var approved = getVersion.approved;
    var active = getVersion.active;
    var userId = getVersion.userId;
    var approvalId = getVersion.approvalId;
    
    $scope.version = number;
    $scope.data = getVersion;
    
    $scope.versionSchema = {
        type: "object",
        properties: {
            id: {},
            title: {
                type: 'string',
                title: 'Title',
                default: title
            },
            effectiveDate: {
                type: 'string',
                format: 'date',
                title: 'Effective Date',
                default: effectiveDate,
                description: 'The date that this version will be effective after.'
            },
            reviewDate: {
                type: 'string',
                format: 'date',
                title: 'Review Date',
                default: reviewDate,
                description: 'The date that this version needs to be reviewed on or before.'
            },
            approved: {},
            active: {},
            userId: {},
            approvalId: {}
        }
    };
    
    $scope.versionForm = [
        '*',
        {
            type: 'submit',
            title: 'Save'
        }
    ];
}])

.controller('versionNew', ['$http', '$scope', '$routeParams', 'versCount', 'getProc', function($http, $scope, $routeParams, versCount, getProc) {
    var number = Number(versCount) + 1;
    $scope.procedure = getProc;
    $scope.version = {};
    $scope.versionFields = [
        {
            key: 'procedureId',
            type: 'input',
            defaultValue: $routeParams.proid,
            templateOptions: {
                type: 'hidden'
            }
        }, {
            key: 'number',
            type: 'input',
            defaultValue: number,
            templateOptions: {
                type: 'text',
                label: 'Number',
                required: true
            }
        }, {
            key: 'effectiveDate',
            type: 'input',
            templateOptions: {
                label: 'Effective Date',
                type: 'datepicker',
                datepickerPopup: 'dd-MMMM-yyyy',
                datepickerOptions: {
                    format: 'MMMM dd,yyyy'
                }
            }
        }, {
            key: 'active',
            type: 'checkbox',
            defaultValue: true,
            templateOptions: {
                label: 'Active'
            }
        }
    ];
    
    // copied from http://www.cheynewallace.com/uploading-to-s3-with-angularjs/
    $scope.creds = {
        bucket: 'andydlindsay-dev-eh-up',
        bucketFolder: 'img/instruction',
        destinationBucket: 'andydlindsay-dev-eh-down',
        access_key: 'AKIAIYFN2ZP4JJJVO7XA',
        secret_key: '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'
    };
    
    /*global AWS*/ 
    $scope.upload = function() {
        // Configure The S3 Object 
        AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
        AWS.config.region = 'us-east-1';
        var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket + '/' + $scope.creds.bucketFolder } });
                
        if($scope.file) {
            // disable save button to prevent duplicate uploads
            angular.element(document.getElementById('imageSave'))[0].disabled = true;
            var date = new Date();
            var fileKey = date.getTime() + '-' + $scope.file.name;
            var params = { Key: fileKey, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
            
            bucket.putObject(params, function(err, data) {
              if(err) {
                // There Was An Error With Your S3 Config
                alert(err.message);
                return false;
              }
              else {
                // Success!
                alert('Upload Done');
                // enable save button
                angular.element(document.getElementById('imageSave'))[0].disabled = false;
                $http.get('/s3/transfer/' + fileKey)
                .then(function(response) {
                    console.log(response);
                });
              }
            })
            .on('httpUploadProgress',function(progress) {
                  // Log Progress Information
                  console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
        }
        else {
            // No File Selected
            alert('No File Selected');
        }
    };
    // end of copy & paste

    $scope.instructionSchema = {
        type: "object",
        properties: {
            firstName: {
                type: 'string',
                minLength: 2,
                title: 'First Name'
            },
            surname: {
                type: 'string',
                minLength: 2,
                title: 'Surname',
                description: 'The name your momma gave ya.'
            },
            birthdate: {
                type: 'string',
                format: 'date',
                title: 'Birthdate',
                minDate: new Date()
            }
        }
    };
    $scope.instructionForm = [
        '*',
        {
            type: 'submit',
            title: 'Save'
        }    
    ];
    $scope.instruction = {};
    $scope.instrSubmit = function() {
        console.log('instruction: ' + $scope.instruction);
        $scope.upload();
    };
    $scope.fileSubmit = function() {
        console.log($scope.file);
    };
    $scope.verSubmit = function() {
        console.log($scope.instruction);
    };
}]);