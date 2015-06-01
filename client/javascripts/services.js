/*global angular */

(function () {
    "use strict";

    angular.module('myApp.services', ['ngResource']).factory('gameoutService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            // REST url to server
            db.groups = $resource('/api/groups/:_id', {}, actions);
            return db;
        }]);

   /* module.factory('groupsService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            // REST url to server
            db.groups = $resource('/api/groups/:_id', {}, actions);
            return db;
        }]); */
}());