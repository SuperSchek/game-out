





var myApp = angular.module('myApp', ['ngRoute', 'myApp.services'])

myApp.controller('homeCtrl', function ($scope){
    $scope.probeersel = "mus mahl probieren eg  segkjhgid";

});

myApp.controller('gameCtrl', function ($scope){
    $scope.game = "Game out!";
    $scope.iets = "halloooooo";

});

myApp.controller('faqCtrl', function ($scope){

});


myApp.controller('leaderboardCtrl', function ($scope){

});


myApp.controller('loginCtrl', function ($scope, $http, $window){

   console.log("Login controller");

    $scope.loginInfo = {
        userName: "",
        password: ""
    }

    console.log($scope.loginInfo);
    $scope.doeLogin = function () {
        $http.post("/login", $scope.loginInfo)
            .success(function (replyData) {
                $window.location = "/#/faq";
            })
            .error(function (errorData, status) {
                console.log("LOGIN AJAX ERROR", status, errorData);
            })
    }
});


myApp.controller('myprofileCtrl', function ($scope){

});


myApp.controller('searchfriendsCtrl', function ($scope){

});

myApp.controller('groupsCtrl', function($scope){



});

myApp.controller('createGroupCtrl', function($scope, $location, $routeParams, gameoutService){

    $scope.save = function(){
        gameoutService.groups.save({}, $scope.group, function(res){

        });
    };

});





