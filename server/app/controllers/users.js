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
                    res.status(200).json(user);
                }
            });
        }
    });
};


exports.signin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
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
    })(req, res, next);
};

exports.profile = function (req, res) {
    if (req.isAuthenticated()) {
        res.send({user: req.user});
    } else {
        res.redirect('/#/login');
    }
};

exports.retrieveAll = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
};


exports.retrieve = function (req, res) {
    User
        .findOne({_id: req.params._id}, {})
        .populate('friends', 'username')
        .exec(function (err, group) {
            if (err) {
                return res.send(err);
            }
            res.json(group);
        });
};

exports.addFriend = function (req, res) {
    var conditions, update, options, callback, retObj, friends;

    friends = req.user.friends;
    console.log(req.body);
    friends.push(req.body._id);

    conditions = {
        _id: req.user._id
    };

    update = {
        friends: friends || ''
    };
    options = {
        multi: false
    };

    callback = function (err, doc) {
        retObj = {
            meta: {
                "action": "update",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };
        return res.send(retObj);
    };

    User
        .findByIdAndUpdate(conditions, update, options, callback);
};

exports.deleteOne = function (req, res) {
    var conditions, callback;

    conditions = {
        _id: req.params._id
    };
    callback = function (err, doc) {
        var retObj = {
            meta: {
                "action": "delete",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };
        return res.status(200).send(retObj);
    };
    User
        .remove(conditions, callback);
};

exports.updateOne = function (req, res) {
    var conditions, update, options, callback;
    conditions = {
        _id: req.params._id
    };
    update = {
        username: req.body.username || "",
        city: req.body.city || ""
    };
    options = {
        multi: false
    };

    callback = function (err, doc) {

        var retObj = {

            meta: {
                "action": "update",
                'timestamp': new Date(),
                filename: __filename
            },

            doc: doc,

            err: err
        };
        return res.send(retObj);
    };


    User
        .findByIdAndUpdate(conditions, update, options, callback);
};
