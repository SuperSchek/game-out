/**
 * Created by tom on 29-5-15.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/user');
var mongoose = require('mongoose'),
    User = mongoose.model('User');




router.post("/login", function(req,res) {
    console.log("POST LOGIN", req.body.username, req.body.password );

    authenticate(req.body.username, req.body.password, function() {

        //req.session.username = req.body.username;
        //
        //req.session.password = req.body.password;
        //
        //req.session.isLoggedIn = true;

        res.redirect("/#/faq");

    })

});

router.get("/login", checkAuthentication, function(req,res) {
    console.log("GET GEHEIM");
});


function checkAuthentication(req,res,next) {
    if( req.session && req.session.isLoggedIn === true ) {
        console.log("checkAuthentication OK");
    } else {
        console.log("checkAuthentication FAILED");
    }

}

function authenticate( uname, passwd, callback) {

    User.findOne(uname, function (err, doc){
        if(doc != null) {
            if (doc.username === uname) {
                if (doc.password === passwd) {
                    callback();
                } else {
                    console.log("Wrong Password!");
                }
            } else {
                console.log("Wrong Username!");
            }
            console.log("Das niet goed!!");
        }

    });



}



module.exports = router;
