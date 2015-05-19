
//
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3002);

io.sockets.on('connection', function (socket) {
  socket.on('information', function (data) {
    io.sockets.emit('information', data);
  });
});

// For serving static files inside ./client
app.use(require('express').static('/home/sjenk/public_html/client'));

//// For hosing on Heroku
//io.configure(function () {
//  io.set("transports", ["xhr-polling"]);
//  io.set("polling duration", 10);
//  io.set('log level', 1)
//});