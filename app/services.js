/*global angular*/
(function() {
angular.module('services',['ngResource'])

    // return a count of the number of active categories
    .factory('CategoryCount', ['$http', function($http) {
        return {
            getCount: function() {
                return $http.get('/api/categorycount');
            }  
        };
    }])
    
    // returns one category that matches the id passed
    .factory('getCats', function($http) {
        return {
            getCategories: function(id) {
                return $http.get('/api/category/' + id + '/edit');
            }  
        };
    })
    
    .factory('secCount', ['$http', function($http) {
        return {
            getCount: function(id) {
                return $http.get('/api/sectioncount/' + id);
            }  
        };
    }])
    
    .factory('getSect', function($http) {
        return {
            getSection: function(id) {
                return $http.get('/api/section/' + id + '/edit');
            }  
        };
    })
    
    .factory('procCount', ['$http', function($http) {
        return {
            getCount: function(id) {
                return $http.get('api/procedurecount/' + id);
            }
        };
    }])
    
    .factory('getProc', ['$http', function($http) {
        return {
            getProcedure: function(id) {
                return $http.get('api/procedure/' + id + '/edit');
            }
        };
    }])
    
    .factory('versCount', ['$http', function($http) {
        return {
            getCount: function(id) {
                return $http.get('api/versioncount/' + id);
            }
        };
    }])
    
    .factory('getVers', ['$http', function($http) {
        return {
            getVersion: function(id) {
                return $http.get('api/version/' + id + '/edit');
            }
        };
    }]);
    
})();