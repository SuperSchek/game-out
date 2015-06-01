'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Group name',
        trim: true
    },
    users: [{ type: Number, ref: 'User' }],
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Group', GroupSchema);