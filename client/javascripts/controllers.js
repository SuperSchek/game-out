var myApp = angular.module('myApp', ['ngRoute', 'myApp.services'])

myApp.controller('homeCtrl', function ($scope, $http, $rootScope, $routeParams){
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

        //var r = confirm("Weet je zeker dat je je account wilt verwijderen?");
        //if (r == true) {
            console.log("deleting account");
            $http.delete("/api/users/delete/" + id)
                .success(function (data) {
                    console.log(data)
                    console.log('deleted');

                })
                .error(function (errorData, status) {
                    console.log("error deleting account ", errorData, status);
                });
        //} else {
        //    console.log("Not deleted")
        //}

    };

    $scope.updateAccount = function () {
        console.log("update account");
        console.log($scope.user);

        $http.put("/api/users/"+ $scope.user._id, $scope.user)
            .success(function (data) {
                console.log("update succesfull")
                console.log(data);
            })
            .error(function (errorData, status) {
                console.log("update failed", errorData, status);
            });
    };

});


myApp.controller('searchfriendsCtrl', function ($scope, $http){
    $http.get("/api/users")
        .success(function (data) {
            console.log(data);
            $scope.userList = data;
        })
        .error(function (errorData, status) {
            console.log("Cannot get list of users(usercontroller) ", errorData, status);
        });
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

myApp.controller('detailGroupCtrl', function($scope, $http, $routeParams){
    $http.get('/api/groups/' + $routeParams._id)
        .success(function(data){
            var users = {}, split;
            data.usercount = data.users.length;
            split = Math.round(data.users.length / 2);
            users[0] = data.users.slice(0, split);
            users[1] = data.users.slice(split, data.users.length);
            data.users = users;
            $scope.group = data;
        });
});

myApp.controller('createGroupCtrl', function($scope, $http, $location, $routeParams, gameoutService){
    var i, j;
    // Creator moet nog gefixt worden!! Bij creator moet de _id van de huidige gebruiker worden ingevuld

   $scope.newUserGroup = [];
   $scope.userList = null;
    $scope.error = null;
    $scope.newGroup = {
        name: "",
        users: "",
        creator: "",
        teamPoints: 0
    }

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
                $scope.newUserGroup.push($scope.userList[i])
                $scope.userList.splice([i], 1);
            }
        }
    };

    $scope.removeFromArray = function (userId) {
        for(j = 0; j < $scope.newUserGroup.length; j +=1 ){
            if($scope.newUserGroup[j]._id === userId){
                $scope.userList.push($scope.newUserGroup[j])
                $scope.newUserGroup.splice([j], 1);
            }
        }
    };

    $scope.createNewGroup = function () {
        var z, listOfId = [];
        if($scope.newUserGroup.length === 0){
            $scope.error = "Geen leden geselecteerd!";
        }else{
        for(z = 0; z < $scope.newUserGroup.length; z += 1){
            listOfId.push($scope.newUserGroup[z]._id);
        };
        $scope.newGroup.users = listOfId;
        $scope.newGroup.creator = $scope.newUserGroup[0]._id;
        //console.log($scope.newGroup);

        $http.post("/api/groups", $scope.newGroup)
            .success(function (replyData) {
                console.log("gelukt!");
            })
            .error(function (errorData, status) {
                console.log("LOGIN AJAX ERROR", status, errorData);
            })


    }
    }


});

myApp.controller('registerCtrl', function($scope, $http, $window){

    $scope.regInfo = {
        firstname: "",
        lastname: "",
        city: "",
        username: "",
        password: "",
        email: "",
        userPoints: 0
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





