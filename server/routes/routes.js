/*jslint node:true */
"use strict";

/** @module Routes for books */
/** @class */
var express = require('express'),
    passport = require('passport'),
    router = express.Router();


/**  book routes
---------------
We create a variable "user" that holds the controller object.
We map the URL to a method in the created variable "controller".
In this example is a mapping for every CRUD action.
*/
var userController = require('../app/controllers/users.js');
var groupsController = require('../app/controllers/groups.js');

// User Routes
router.post('/users', userController.signup);
router.route('/users/login').post(passport.authenticate('local', function(res, req){

}));

// Groups Routes
router.post('/groups', groupsController.create);

module.exports = router;
