/*jslint node:true */
"use strict";

/** @module Routes for books */
/** @class */
var express = require('express'),
    passport = require('passport'),
    expose = require('express-expose'),
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
router.post('/users/register', userController.signup);
router.get('/users', userController.retrieveAll);
router.post('/users/login', userController.signin);
router.get('/users/profile', userController.profile);

// Groups Routes
router.post('/groups', groupsController.create);
router.get('/groups', groupsController.retrieveAll);

// test if logged in
router.get('/loggedin', function(req, res){
    res.send(req.isAuthenticated() ? req.user : '0');
});

module.exports = router;
