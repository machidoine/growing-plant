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
var color = ["blue", "red", "black"];

var Grid = class {
    constructor(width, height, initialPoints) {
        this.width = width;
        this.height = height;
        this._points = initialPoints;
    }

    get points() {
        return this._points;
    }

    addPoints(point) {
        var index = this._points.findIndex(function(element){
            return element.x === point.x && element.y === point.y;
        });

        if(index < 0) {
            this._points.push(point);    
        } else {
            this._points[index] = point;
        }
    }

}

var initialPoints = [];
for(let i = 0; i < 50; i++) {
    for(let j = 0; j < 49; j++) {
        initialPoints.push({"x":i, "y":j, "type":"seed"});
    }
}
initialPoints = [{"x":0, "y":0, "type":"seed"}]
var grid = new Grid(50, 50, initialPoints);

io.on('connection', function(socket) {
    sockets.push(socket);
    players[socket.id] = {};
    players[socket.id].color = color[Math.floor(Math.random() * 3)];

    socket.emit('myConnect', grid.points);
    
    socket.on('disconnect', function() {
        sockets.splice(sockets.indexOf(socket), 1);
    });
    
    socket.on('addGridElement', function(gridElement) {
        console.log(socket);
        gridElement.color = players[socket.id].color;
        console.log(players);
        grid.addPoints(gridElement);
        broadcast('gridElementReceive', grid.points);
    
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
