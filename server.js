//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

var sockets = [];
var players = {};
var color = ["blue", "red", "black"]
var points = [
{"x":0,"y":0,"type":"seed"}
];

io.on('connection', function(socket) {
    sockets.push(socket);
    players[socket.id] = {};
    players[socket.id].color = color[Math.floor(Math.random() * 3)];

    socket.emit('myConnect', points);
    
    socket.on('disconnect', function() {
        sockets.splice(sockets.indexOf(socket), 1);
    });
    
    socket.on('addGridElement', function(gridElement) {
        console.log(socket);
        gridElement.color = players[socket.id].color;
        console.log(players);
        points.push(gridElement);
        console.log(points);
        broadcast('gridElementReceive', points);
    
    });
});


setInterval(function() {
//playGrid[Math.floor(Math.random() * 10000)] = {"type":"seed"};
//broadcast('gridElementReceive', playGrid);
}, 200000);

function broadcast(event, data) {
    sockets.forEach(function(socket) {
        socket.emit(event, data);
    });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});
