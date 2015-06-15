/*jslint node:true */

'use strict';

var mongoose = require('mongoose'),
    Group = mongoose.model('Group');

/**
 * Creates a group
 */

exports.create = function (req, res) {

    var group = new Group(req.body);
        group.creator = req.user._id;
    // Then save the group
    group.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        return res.status(200).send({
            message: 'Group created succesfully!',
            group: group
        });
    });
};

exports.retrieveAll = function (req, res) {
    Group
        .find()
        .populate('creator', 'username')
        .populate('users', 'username')
        .exec(function (err, groups) {
            if (err) {
                return res.send(err);
            }
            res.json(groups);
        });
};

exports.retrieve = function (req, res) {
    Group
        .findOne({
            _id: req.params._id
        }, {})
        .populate('creator', 'username')
        .populate('users', 'username')
        .exec(function (err, group) {
            if (err) {
                return res.send(err);
            }
            res.json(group);
        });
};

exports.delete = function (req, res) {

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
    Group
        .remove(conditions, callback);
};
