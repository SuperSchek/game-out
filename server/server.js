
//
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3005);

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

//// For hosing on Heroku
//io.configure(function () {
//  io.set("transports", ["xhr-polling"]);
//  io.set("polling duration", 10);
//  io.set('log level', 1)
//});

function creatArrayOfCoins(cords){
    var y1, y2, x1, x2, amountOfCoins, i, randomCords = [];
    y1 = cords.Da.A;
    y2 = cords.Da.j;
    x1 = cords.va.A;
    x2 = cords.va.j;

    amountOfCoins = 10;

    for (i = 0; i < amountOfCoins; i += 1) {
        randomCords[i] = [r(x1, x2), r(y1, y2)];
        // drawCoins(randomCords[i]);
    }
    ;

    function r(max, min) {
        return (Math.random() * (max - min) + min);
    }
    return randomCords;


};