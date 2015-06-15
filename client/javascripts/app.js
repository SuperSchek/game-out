/*global angular, scoreCtrl, BookDetailCtrl */
/*jslint node: true */
/*jshint strict:false */

"use strict";

/**
 * @see http://docs.angularjs.org/guide/concepts
 */
//var myApp = angular.module('myApp', ['ngRoute'])
myApp.config(['$routeProvider', function ($routeProvider) {

        //login
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        });
        // homepage
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        });
        // the game
        $routeProvider.when('/game', {
            templateUrl: 'partials/game.html',
            controller: 'gameCtrl'
        });
        //faq
        $routeProvider.when('/faq', {
            templateUrl: 'partials/faq.html',
            controller: 'faqCtrl'
        });
        //leaderboard
        $routeProvider.when('/leaderboard', {
            templateUrl: 'partials/leaderboard.html',
            controller: 'leaderboardCtrl'
        });
        //myprofile
        $routeProvider.when('/myprofile', {
            templateUrl: 'partials/myprofile.html',
            controller: 'myprofileCtrl'
        });
        //searchfriends
        $routeProvider.when('/searchfriends', {
            templateUrl: 'partials/searchfriends.html',
            controller: 'searchfriendsCtrl'
        });
        //friendlist
        $routeProvider.when('/friendlist', {
            templateUrl: 'partials/friendlist.html',
            controller: 'friendlistCtrl'
        });
        //groups
        $routeProvider.when('/groups', {
            templateUrl: 'partials/groups.html',
            controller: 'groupsCtrl'
        });
        $routeProvider.when('/groups/create', {
            templateUrl: 'partials/groups/create.html',
            controller: 'createGroupCtrl'
        });
        $routeProvider.when('/groups/:_id', {
            templateUrl: 'partials/groups/detail.html',
            controller: 'detailGroupCtrl'
        });
        $routeProvider.when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerCtrl'
        });
        //users
        $routeProvider.when('/users/:_id', {
            templateUrl: 'partials/users/user.html',
            controller: 'detailUserCtrl'
        });
        // When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/login"
        });
    }]);
