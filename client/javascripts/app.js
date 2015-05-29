/*global angular, BookListCtrl, BookDetailCtrl */


/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var nameApp = angular.module('nameApp', []);
nameApp.controller('scoreCtrl', function ($scope){
    console.log(users);
    $scope.users = users;
    console.log($scope.users);
});

nameApp.controller('usersController', function($scope){

});