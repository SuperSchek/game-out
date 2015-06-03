'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Signup - allows a user to register
 */

exports.signup = function (req, res) {
    console.log("signup get");
    console.log(req.body);
    // Init Variables
    var user = new User(req.body);
    var message = null;

    // Add missing user fields
    user.provider = 'local';

    // Then save the user
    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    });
};

exports.retrieveAll = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
};