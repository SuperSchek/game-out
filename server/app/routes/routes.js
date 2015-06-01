/**
 * Created by tom on 29-5-15.
 */


var User = require('../models/user');


var express = require('express');
var router = express.Router();

var controller = require('../controllers/users');

router.route('/login')
    .get(controller.retrieveOne);


//router.route('/quizes')
//    .get(controller.retrieveQuestion);
//
//router.route('/resultTeacher')
//    .post(controller.createOneResult);





module.exports = router;