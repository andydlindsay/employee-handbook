/*global angular*/
angular.module('controllers')

.controller('versionList', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('/api/versions/' + $routeParams.proid)
    .then(function(response) {
        $scope.versions = response.data;
    });
}])

.controller('versionEdit', ['$routeParams', '$http', '$window', '$scope',  'getVers', 'getProc', '$moment', function($routeParams, $http, $window, $scope, getVersion, getProc, $moment) {
    var title = getVersion.title;
    var effectiveDate = getVersion.effectiveDate;
    var reviewDate = getVersion.reviewDate;
    
    $scope.procTitle = getProc.title;
    
    $scope.version = getVersion;
    
    if (!getVersion.active) {
        $scope.versionSchema = {
            type: "object",
            properties: {
                title: {
                    type: 'string',
                    title: 'Title',
                    default: title
                },
                effectiveDate: {
                    type: 'string',
                    format: 'date',
                    title: 'Effective Date',
                    default: effectiveDate
                },
                reviewDate: {
                    type: 'string',
                    format: 'date',
                    title: 'Review Date',
                    default: reviewDate
                }
            }
        };
        $scope.versionForm = [
            '*',
            {
                type: "actions",
                items: [
                    { 
                        type: 'submit', 
                        style: 'btn-primary', 
                        title: 'Save and Publish' 
                    },
                    { 
                        type: 'button', 
                        title: 'Save as draft', 
                        onClick: 'saveAsDraft()'
                    },
                    { 
                        type: 'button', 
                        title: 'Edit Instructions', 
                        onClick: 'editInstr()'
                    }
                ]
            }
        ];
    } else {
        $scope.versionSchema = {
            type: "object",
            properties: {
                title: {
                    type: 'string',
                    title: 'Title',
                    default: title,
                    readonly: true
                },
                effectiveDate: {
                    type: 'string',
                    format: 'date',
                    title: 'Effective Date',
                    default: effectiveDate,
                    readonly: true
                },
                reviewDate: {
                    type: 'string',
                    format: 'date',
                    title: 'Review Date',
                    default: reviewDate,
                    readonly: true
                }
            }
        };
        $scope.messageClass = 'text-danger';
        $scope.message = 'This is the currently active version. It cannot be edited.';
        $scope.versionForm = [
            '*',
            {
                type: "actions",
                items: [
                    { 
                        type: 'button', 
                        style: 'btn-primary', 
                        title: 'Review and Renew', 
                        onClick: 'renew()'
                    },
                    { 
                        type: 'button', 
                        title: 'View Instructions', 
                        onClick: 'viewInstr()'
                    }
                ]
            }
        ];
    }
    
    $scope.renew = function() {
        // extend the review date by the default increment
        var date = $moment();
        $scope.version.reviewDate = date.add(365, 'days');
        // save the record
        $http.put('/api/version/' + $routeParams.id, $scope.version)
        .success(function(data) {
            $window.location.href = '#/procedure/' + $routeParams.proid;
        })
        .error(function() {
            
        });
    };
    
    $scope.viewInstr = function() {
        // view the instruction list in read only
        $window.location.href = '#/procedure/' + $routeParams.proid;
    };
    
    $scope.saveAsDraft = function() {
        // save record in its current form to the database.
        $http.put('/api/version/' + $routeParams.id, $scope.version)
        .success(function(data) {
            $window.location.href = '#/procedure/draft/' + $scope.version.procedureId;
        })
        .error(function() {
            
        });
    };
    
    $scope.editInstr = function() {
        // save the version record 
        
        // open the edit instruction form
        
    };
    
    $scope.versSubmit = function() {
        // check if effective date is in the future, if it is, change it to today
        // in order to compare dates, you have to create Date objects
        var effDate = new Date($scope.version.effectiveDate);
        var today = new Date();
        if (effDate > today) {
            $scope.version.effectiveDate = today;
        }
        // check if any records exist in the instruction table relating to this version. if not, warn before publishing.
        
        // save record in its current form to the database. set active to true for this version
        // set active to false for any other versions that exist for the procedure
        $http.put('/api/activeversion/' + $routeParams.id, $scope.version)
        .success(function(data) {
            $window.location.href = '#/procedure/' + $routeParams.proid;
        })
        .error(function() {
             
        });
    };
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
        }
    ];
    
    // copied from http://www.cheynewallace.com/uploading-to-s3-with-angularjs/
    $scope.creds = {
        bucket: process.env.AWS_UP_BUCKET,
        bucketFolder: 'img/instruction',
        destinationBucket: process.env.AWS_DOWN_BUCKET,
        access_key: process.env.AWS_UP_BUCKET_ACCESS_KEY,
        secret_key: process.env.AWS_UP_BUCKET_SECRET_KEY
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