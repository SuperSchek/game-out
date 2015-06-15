/*jslint node:true */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * A Validation function for local strategy password
 */
var validatePasswordLength = function (password) {
    return (password && password.length > 6);
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        default: '',
        required: 'Vul alsjeblieft je voornaam in'
    },
    lastname: {
        type: String,
        trim: true,
        default: '',
        required: 'Vul alsjeblieft je achternaam in'
    },
    city: {
        type: String,
        required: 'Vul alsjeblieft je plaats in'
    },
    email: {
        type: String,
        trim: true,
        default: '',
        required: 'Vul alsjeblieft je email in',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: 'De gebruikersnaam moet uniek zijn',
        required: 'Please fill in a username',
        trim: true
    },
    password: {
        type: String,
        default: '',
        validate: [validatePasswordLength, 'Password should be longer']
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    userPoints: {
        type: Number
    },
    friends: [
        {type: Schema.ObjectId, ref: 'User'}
    ]


});

/**
 * Hook a pre save method to hash the password
 */

UserSchema.pre('save',
    function (next) {
        if (this.password) {
            var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }

        next();
    }
    );

UserSchema.methods.authenticate = function (password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

mongoose.model('User', UserSchema);
