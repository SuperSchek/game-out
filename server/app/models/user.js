/**
 * Created by tom on 29-5-15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    city: {type:String, required: true},
    email: {type:String, required: true},
    firtsname: {type:String, required: true},
    lastname: {type:String, required: true}
});

module.exports = mongoose.model('User', userSchema);