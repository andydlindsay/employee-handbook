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
    var versid = getVersion.id;
    
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
        $window.location.href = '#/instruction/list?versid=' + versid;
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
        $window.location.href = '#/instruction/list?versid=' + versid;
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

.controller('versionNew', ['$http', '$scope', '$routeParams', 'versCount', 'getProc', '$moment', '$window', function($http, $scope, $routeParams, versCount, getProc, $moment, $window) {
    var number = Number(versCount) + 1;
    $scope.procedure = getProc;
    $scope.version = {};
    $scope.version.procedureId = getProc.id;
    $scope.versionSchema = {
        type: "object",
        properties: {
            number: {
                type: 'string',
                title: 'Number',
                default: number,
                readonly: true
            },
            title: {
                type: 'string',
                title: 'Title'
            },
            effectiveDate: {
                type: 'string',
                format: 'date',
                title: 'Effective Date'
            },
            reviewDate: {
                type: 'string',
                format: 'date',
                title: 'Review Date'
            }
        }
    };
    $scope.versionForm = [
        '*',
        {
            type: "actions",
            items: [
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
    
    $scope.saveAsDraft = function() {
        // save record in its current form to the database
        $http.post('/api/version', $scope.version)
        .success(function(data) {
            $window.location.href = '#/procedure/draft/' + $scope.version.procedureId;
        })
        .error(function() {
            
        });
    };
    
    $scope.editInstr = function() {
        
    };
}]);