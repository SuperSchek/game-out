/*jslint node:true*/
/*global angular*/
/*global console*/
"use strict";
var myApp = angular.module('myApp', ['ngRoute', 'myApp.services']);

myApp.controller('homeCtrl', function ($scope, $http) {
    $http.get("/api/users")
        .success(function (data) {
            console.log(data);
            $scope.userList = data;
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

myApp.controller('gameCtrl', function ($scope) {
    $scope.game = "Game out!";
    $scope.iets = "halloooooo";

});
myApp.factory("settings",function(){
    return {};
});

//myApp.controller('faqCtrl', function () {
//
//});


myApp.controller('leaderboardCtrl', function ($scope, $http) {
    $http.get("/api/users")
        .success(function (data) {
            console.log(data);
            $scope.userList = data;
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

myApp.controller('myprofileCtrl', function ($scope, $http) {
    $scope.user = null;
    $http.get("/api/users/profile")
        .success(function (data) {
            $scope.user = data.user;
            console.log(data.user);
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of user(usercontroller) ", errorData, status);
        });
    $scope.deleteAccount = function (id) {
        console.log("deleting account");
        $http.delete("/api/users/delete/" + id)
            .success(function (data) {
                console.log(data);
                console.log('deleted');

            })
            .error(function (errorData, status) {
                console.log("error deleting account ", errorData, status);
            });
    };

    $scope.updateAccount = function () {
        console.log("update account");
        console.log($scope.user.id);

        $http.put("/api/users/" + $scope.user._id, $scope.user)
            .success(function (data) {
                console.log("update succesfull");
                console.log(data);
            })
            .error(function (errorData, status) {
                console.log("update failed", errorData, status);
            });
    };
});


myApp.controller('searchfriendsCtrl', function ($scope, $http) {
    $http.get("/api/users")
        .success(function (data) {
            console.log(data);
            $scope.userList = data;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });
});

myApp.controller('groupsCtrl', function ($scope, $http) {
    $http.get("/api/groups")
        .success(function (data) {
            console.log(data);
            $scope.groupList = data;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });

});

myApp.controller('detailGroupCtrl', function ($scope, $http, $routeParams) {
    var users, split;
    $http.get('/api/groups/' + $routeParams._id)
        .success(function (data) {
            users = {};
            data.usercount = data.users.length;
            split = Math.round(data.users.length / 2);
            users[0] = data.users.slice(0, split);
            users[1] = data.users.slice(split, data.users.length);
            data.users = users;
            $scope.group = data;
        });
});

myApp.controller('createGroupCtrl', function ($scope, $http) {
    var i, j;

    $scope.newUserGroup = [];
    $scope.userList = null;
    $scope.error = null;
    $scope.newGroup = {
        name: "",
        users: "",
        creator: "",
        teamPoints: 0
    };

    $http.get("/api/users")
        .success(function (data) {
            console.log(data);
            $scope.userList = data;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });

    $scope.addToArray = function (userId) {
        for (i = 0; i < $scope.userList.length; i += 1) {
            if ($scope.userList[i]._id === userId) {
                $scope.newUserGroup.push($scope.userList[i]);
                $scope.userList.splice([i], 1);
            }
        }
    };

    $scope.removeFromArray = function (userId) {
        for (j = 0; j < $scope.newUserGroup.length; j += 1) {
            if ($scope.newUserGroup[j]._id === userId) {
                $scope.userList.push($scope.newUserGroup[j]);
                $scope.newUserGroup.splice([j], 1);
            }
        }
    };

    $scope.createNewGroup = function () {
        var z, listOfId = [];
        if ($scope.newUserGroup.length === 0) {
            $scope.error = "Geen leden geselecteerd!";
        } else {
            for (z = 0; z < $scope.newUserGroup.length; z += 1) {
                listOfId.push($scope.newUserGroup[z]._id);
            }
            $scope.newGroup.users = listOfId;
           // $scope.newGroup.creator = $scope.newUserGroup[0]._id;
            //console.log($scope.newGroup);

            $http.post("/api/groups", $scope.newGroup)
                .success(function (data) {
                    console.log("gelukt!", data);
                })
                .error(function (errorData, status) {
                    console.log("LOGIN AJAX ERROR", status, errorData);
                });


        }
    };


});

myApp.controller('registerCtrl', function ($scope, $http, $window) {

    $scope.regInfo = {
        firstname: "",
        lastname: "",
        city: "",
        username: "",
        password: "",
        email: "",
        userPoints: 0
    };

    $scope.signup = function () {
        $http.post("/api/users/register", $scope.regInfo)
            .success(function (data) {
                $window.location = "/#/login";
                console.log(data);
            })
            .error(function (errorData, status) {
                console.log("LOGIN AJAX ERROR", status, errorData);
            });
    };

});

myApp.controller('loginCtrl', function ($scope, $http, $window) {

    $scope.loginInfo = {
        username: "",
        password: ""
    };

    $scope.signin = function () {
        $http.post("/api/users/login", $scope.loginInfo)
            .success(function (data) {
                $window.location = "/#/home";
                console.log(data);
            })
            .error(function (errorData, status) {
                console.log("LOGIN AJAX ERROR", status, errorData);
            });
    };


});

myApp.controller('detailUserCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/users/' + $routeParams._id)
        .success(function (data) {
            $scope.user = data;
        });

    $scope.addFriend = function () {
        console.log($routeParams);
        $http.put('/api/users/addfriend', {
            _id: $routeParams._id
        })
            .success(function (data) {
                console.log(data);
            })
            .error(function (errorData, status) {
                console.log("error adding friend", errorData, status);
            });
    };
});

myApp.controller('createGameCtrl', function ($scope, $http, settings) {
    console.log("create game controller");


    $scope.settings = {
        gameType: "",
        freeForAll: true,
        coinLimit: 20,
        timeLimit: 10,
        powerUps: false
    };

    $scope.setGameType = function (type) {
        $scope.settings.gameType = type;
    }


});