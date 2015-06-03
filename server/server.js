/*
>>>>>>> 5e1f9ccb8f170a1c1b4c5147e49f1f84b6710d2e
var app = require('express')();
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(6032);

io.sockets.on('connection', function (socket) {
  socket.on('information', function (data) {
    io.sockets.emit('information', data);
  });

    socket.on('getCoins', function (cords) {
        console.log(cords);
        var arrayOfCoins = creatArrayOfCoins(cords);
        socket.emit('arrayOfCoins', arrayOfCoins);
    });

});

// For serving static files inside ./client
app.use(require('express').static('../client'));

// DB connect
mongoose.connect('mongodb://server3.tezzt.nl/s509560/users');

// Models
var User = require('./app/models/user');

// Serverside routes
var userRoutes = express.Router('User');

app.use('/login', userRoutes);

function creatArrayOfCoins(cords){
    var y1, y2, x1, x2, amountOfCoins, i, geocoder, randomCords = [];
    y1 = cords.Da.A;
    y2 = cords.Da.j;
    x1 = cords.va.A;
    x2 = cords.va.j;

    amountOfCoins = 10;
   // geocoder = new google.maps.Geocoder();

    for (i = 0; i < amountOfCoins; i += 1) {
        randomCords[i] = [r(x1, x2), r(y1, y2)];

        //var location = new google.maps.LatLng( arrayOfCoins[i][1] ,arrayOfCoins[i][0]);
        //geocoder.geocode({'latLng': location}, function(results, status) {
        //    if (status == google.maps.GeocoderStatus.OK) {
        //        if (results[0].geometry.location_type == google.maps.GeocoderLocationType.ROOFTOP){
        //            console.log("zit op rooftop");
        //        }else{
        //            console.log("niet op rooftop")
        //        }
        //    }else{
        //        console.log("geocoderstatus niet OK"+ status);
        //    }
        //});
    };

    function r(max, min) {
        return (Math.random() * (max - min) + min);
    }




    return randomCords;


}; */

/*jslint node:true */
"use strict";
/** TODO: Test with static-analyzer: define module */

/**
 * Module dependencies.
 * @type {exports}
 */
var fs = require('fs'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    expressSession = require('express-session'),
    flash = require('connect-flash'),
    env,
    config,
    mongoose,
    models_path,
    models_files,
    app,
    routes_path,
    route_files,
    passportConfig;


/**
 * Load configuration
 * @type {*|string}
 */
env = process.env.NODE_ENV || 'development';
config = require('./config/config.js')[env];

/**
 * Bootstrap db connection
 * @type {exports}
 */
mongoose = require('mongoose');
mongoose.connect(config.db);

mongoose.connection.on('error', function (err) {
    console.error('MongoDB error %s', err);
});
mongoose.set('debug', config.debug);

/**
 * Bootstrap models
 * @type {string}
 */
models_path = __dirname + '/app/models';
models_files = fs.readdirSync(models_path);
models_files.forEach(function (file) {
    require(models_path + '/' + file);
});

/**
 * Use express
 * @type {*}
 */
app = express();

/**
 * Socket init
 */


var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(config.port);


/**
 * Express settin   gs
 */
app.set('port', process.env.PORT || config.port);

/**
 * Express middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Middleware to enable logging
 */

if (config.debug) {
    app.use(function (req, res, next) {
        console.log('%s %s %s', req.method, req.url, req.path);
        next();
    });
}

/**
 * Middleware to serve static page
 */
app.use(express.static(__dirname + '/../client/'));

/**
 * Set up Passport and Session
 */

passportConfig = require('./config/passport');
passportConfig = passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(expressSession({
    saveUninitialized: true,
    resave: true,
    secret: 'gameoutSoSecretB0y!'
}));

/**
 * Bootstrap routes
 * @type {string}
 */
routes_path = __dirname + '/routes';
route_files = fs.readdirSync(routes_path);
route_files.forEach(function (file) {
    var route = require(routes_path + '/' + file);
    app.use('/api', route);
});


/**
 * Middleware to catch all unmatched routes
 */
app.all('*', function (req, res) {
    res.send(404);
});


module.exports = app;

