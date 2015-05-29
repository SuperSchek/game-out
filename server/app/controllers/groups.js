'use strict';

var mongoose = require('mongoose'),
    Group = mongoose.model('Group');

/**
 * Creates a group
 */

exports.create = function(req, res) {

    var group = new Group(req.body);

    // Then save the group
    group.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: 'Group created succesfully!'
            });
        }
    });
};