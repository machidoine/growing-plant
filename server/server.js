'use strict'
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

var GrowingGame = require('./game');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);
io.set('log level', 1);

router.use(express.static(path.resolve(__dirname, '../client')));

var sockets = [];
var growingGame = new GrowingGame();
growingGame.start();

io.on('connection', function (socket) {
    sockets.push(socket);

    growingGame.addRemotePlayer(socket);

    socket.on('disconnect', function () {
        sockets.splice(sockets.indexOf(socket), 1);
    });
    
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});