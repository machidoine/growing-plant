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

var Garden = require('./garden');
var Grid = require('./grid');

var utils = require('./utils');

var constants = require('./constants');

var GardenGridConvertor = require('./garden-grid-convertor');


//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);
io.set('log level', 1);

router.use(express.static(path.resolve(__dirname, '../client')));

var sockets = [];
var players = {};

//var initialPoints = [];
//initialPoints = [{"x":0, "y":0, "type":"seed"}];
var garden = new Garden(32, 24, new Grid(32, 24));
garden.addSeed({'position': {'x': 2, 'y': 20}, direction: "down", 'type': 'seed', 'team': 'team3'});

io.on('connection', function (socket) {
    sockets.push(socket);

    socket.on('disconnect', function () {
        sockets.splice(sockets.indexOf(socket), 1);
    });

    players[socket.id] = {};
    players[socket.id].color = constants.color[Math.floor(Math.random() * 3)];
    players[socket.id].team = constants.team[Math.floor(Math.random() * 3)];

    socket.emit('myConnect', GardenGridConvertor.toGrid(garden));



    socket.on('addGridElement', function (gridElement) {
        var start = new Date().getTime();

        gridElement.color = players[socket.id].color;
        gridElement.team = players[socket.id].team;

        if (gridElement.type === 'seed') {
            garden.addSeed(gridElement);
        } else if (gridElement.type === 'stem') {
            garden.addStem(gridElement);
        }

        var grid = GardenGridConvertor.toGrid(garden);
        //console.log(grid);
        broadcast('gridElementReceive', grid);
        var end = new Date().getTime();

        var elapse = end - start;
        console.log('addGridElement : ' + elapse);
    });

});

setInterval(function () {
    garden.plants.forEach(function (el) {
        el.grow();
    })
    var grid = GardenGridConvertor.toGrid(garden);

    broadcast('gridElementReceive', grid);
}, 1000);


function broadcast(event, data) {
    sockets.forEach(function (socket) {
        socket.emit(event, data);
    });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});