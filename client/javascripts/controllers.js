var myApp = angular.module('myApp', ['ngRoute', 'myApp.services'])

myApp.controller('homeCtrl', function ($scope, $rootScope, $routeParams){
    $scope.probeersel = "mus mahl probieren eg  segkjhgid";

});

myApp.controller('gameCtrl', function ($scope){
    $scope.game = "Game out!";
    $scope.iets = "halloooooo";

});

myApp.controller('faqCtrl', function ($scope){

});


myApp.controller('leaderboardCtrl', function ($scope, $http, Auth){
    var arr1 = [];
    var arr2 = [];
    $http.get("/api/users")
        .success(function (data) {
            console.log(data);
            $scope.userList = data;
            //for(var i = 0; i < 3; i++){
            //    arr1.push(data[i]._id);
            //}
            //var object1 = {
            //    name: "badmen",
            //    users: arr1,
            //    creator: data[1]._id
            //};
            //console.log(object1);
            //$http.post("/api/groups", object1)
            //    .success(function (replyData) {
            //        console.log("gelukt");
            //    })
            //    .error(function (errorData, status) {
            //        console.log("LOGIN AJAX ERROR", status, errorData);
            //    })
            //
            //
            //
            //for(var i = 3; i < 6; i++){
            //    arr2.push(data[i]._id);
            //}
            //var object2 = {
            //    name: "TheKealGroup",
            //    users: arr2,
            //    creator: data[5]._id
            //};
            //$http.post("/api/groups", object2)
            //    .success(function (replyData) {
            //        console.log("gelukt");
            //    })
            //    .error(function (errorData, status) {
            //        console.log("LOGIN AJAX ERROR", status, errorData);
            //    })




        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });

    $http.get("/api/groups")
        .success(function (data) {
            console.log(data);
            $scope.groupList = data;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });
});

myApp.controller('myprofileCtrl', function ($scope, $http){
    $http.get("/api/users/profile")
        .success(function (data) {
            $scope.user = data.user;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of user(usercontroller) ", errorData, status);
        });
});


myApp.controller('searchfriendsCtrl', function ($scope){

});

myApp.controller('groupsCtrl', function($scope, $http){
    $http.get("/api/groups")
        .success(function (data) {
            console.log(data);
            $scope.groupList = data;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });

});

myApp.controller('createGroupCtrl', function($scope, $http, $location, $routeParams, gameoutService){
    var i, j;
   $scope.newGroup = [];
   $scope.userList = null;

    $http.get("/api/users")
        .success(function (data) {
            console.log(data);
            $scope.userList = data;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });

    $scope.addToArray = function (userId) {
        for(i = 0; i < $scope.userList.length; i +=1 ){
            if($scope.userList[i]._id === userId){
                $scope.newGroup.push($scope.userList[i])
                $scope.userList.splice([i], 1);
                console.log($scope.newGroup);
                console.log($scope.userList);
            }
        }
    };

    $scope.removeFromArray = function (userId) {
        for(j = 0; j < $scope.newGroup.length; j +=1 ){
            if($scope.newGroup[j]._id === userId){
                $scope.userList.push($scope.newGroup[j])
                $scope.newGroup.splice([j], 1);
                console.log($scope.newGroup);
                console.log($scope.userList);
            }
        }
    };

    $scope.createNewGroup = function (userId) {}
    

});

myApp.controller('registerCtrl', function($scope, $http, $window){

    $scope.regInfo = {
        firstname: "",
        lastname: "",
        city: "",
        username: "",
        password: "",
        email: ""
    }

    $scope.signup = function () {
        $http.post("/api/users/register", $scope.regInfo)
            .success(function (replyData) {
                $window.location = "/#/login";
            })
            .error(function (errorData, status) {
                console.log("LOGIN AJAX ERROR", status, errorData);
            })
    }

});

myApp.controller('loginCtrl', function($scope, $http, $window){

    $scope.loginInfo = {
        username: "",
        password: ""
    }

    $scope.signin = function () {
        $http.post("/api/users/login", $scope.loginInfo)
            .success(function (replyData) {

                $window.location = "/#/home";
            })
            .error(function (errorData, status) {
                console.log("LOGIN AJAX ERROR", status, errorData);
            })
    }


});





