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

// User post Routes
router.post('/users/register', userController.signup);
router.post('/users/login', userController.signin);
// User get Routes
router.get('/users', userController.retrieveAll);
router.get('/users/profile', userController.profile);

router.get('/users/:_id', userController.retrieve);
router.put('/users/addfriend', userController.addFriend);
// User delete Routes
router.delete('/users/delete/:_id', userController.deleteOne);
// User update Routes
router.put('/users/:_id', userController.updateOne);

// Groups Routes
router.post('/groups', groupsController.create);
router.get('/groups', groupsController.retrieveAll);
router.get('/groups/:_id', groupsController.retrieve);

// test if logged in
router.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

module.exports = router;
