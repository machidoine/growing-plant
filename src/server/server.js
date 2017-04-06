'use strict'
//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
let http = require('http');
let path = require('path');

let async = require('async');
let socketio = require('socket.io');
let express = require('express');

let GrowingGame = require('./game/game');
let config = require('./config');
let winston = require('winston');


let router = express();
let server = http.createServer(router);
let io = socketio.listen(server);
io.set('log level', config.server.log.winston.level);


winston.level = config.server.log.winston.level;


router.use(express.static(path.resolve(__dirname, '../client')));

let sockets = [];
let growingGame = new GrowingGame();
growingGame.start();

io.on('connection', function (socket) {
    console.log("new connection !!");
    sockets.push(socket);

    growingGame.addPlayer(socket);

    socket.on('disconnect', function () {
        sockets.splice(sockets.indexOf(socket), 1);
    });
    
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    let addr = server.address();
    winston.debug("Chat server listening at", addr.address + ":" + addr.port);
});