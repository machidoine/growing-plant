
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

var Garden = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this._plants = [];
        this.boundaries = new GardenBoundaries(this);
    }

    addPlant(seed){
        this._plants.push(new Plant(this, seed));
    }

    get plants(){
        return this._plants;
    }

    allowAddHere(point){
        var plantNotElementPresent = this._plants.findIndex(function(plant){
            var seedPresent = plant.seed.x === point.x && plant.seed.y === point.y;
            //console.log('seedPresent', seedPresent);
            var bodyPresent = (plant.body.findIndex(function(body){
                    return body.x === point.x && body.y === point.y
                }));

            //console.log('bodyPresent', bodyPresent);
            return seedPresent && bodyPresent < 0;
        });

        //console.log('plantNotElementPresent',plantNotElementPresent);

        return plantNotElementPresent && this.boundaries.isIn(point);
    }
};

var Plant = class {
    constructor(garden, seed) {
        this.seed = seed;
        this.body = [];
        this.garden = garden;
        this.lastBody = this.seed;
        this.direction = "up";
    }

    grow() {
        var newBody = Object.assign({}, this.lastBody);
        newBody.type = "plant-body";
        newBody.y = newBody.y - 1;

        if(garden.allowAddHere({x:newBody.x, y:newBody.y})) {
            this.body.push(newBody);
            this.lastBody = newBody;
        }
    }
};

var GardenGridConvertor = class{
    static toGrid(garden){
        var grid = new Grid(50, 50, null);
        garden.plants.forEach(function(plant){
            grid.addPoint(plant.seed);
            plant.body.forEach(function(body){
                grid.addPoint(body);
            })
        });
        return grid;
    }
};

var GardenBoundaries = class {
    constructor(garden){
        this.garden = garden;
    }

    isOut(point) {
        if(point.x > garden.width || point.y > garden.height || point.x < 0 || point.y < 0) {
            return true;
        }

        return false;
    }

    isIn(point) {
        return ! this.isOut(point);
    }
};

var Grid = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this._points = [];
    }

    get points() {
        return this._points;
    }

    addPoint(point) {
        var index = this._points.findIndex(function(element){
            return element.x === point.x && element.y === point.y;
        });

        if(index < 0) {
            this._points.push(point);    
        } else {
            this._points[index] = point;
        }
    }

    getCellByType(type) {
        return this._points.filter(function(e) {
           return e.type == type; 
        });
    }

}

//var initialPoints = [];
//initialPoints = [{"x":0, "y":0, "type":"seed"}];
var grid = new Grid(50, 50);
var garden = new Garden(50, 50);
garden.addPlant({"x":2, "y":20, "type":"seed"});

io.on('connection', function(socket) {
    sockets.push(socket);
    players[socket.id] = {};
    players[socket.id].color = color[Math.floor(Math.random() * 3)];

    socket.emit('myConnect', grid.points);
    
    socket.on('disconnect', function() {
        sockets.splice(sockets.indexOf(socket), 1);
    });
    
    socket.on('addGridElement', function(gridElement) {
        gridElement.color = players[socket.id].color;
        if(gridElement.type === 'seed'){
            garden.addPlant(gridElement);
        }
        var grid = GardenGridConvertor.toGrid(garden);
        console.log(grid);
        broadcast('gridElementReceive', grid.points );
    });

});

setInterval(function() {
    garden.plants.forEach(function(el){
        el.grow();
    })
    var grid = GardenGridConvertor.toGrid(garden);
    broadcast('gridElementReceive', grid.points);
}, 1000);



function broadcast(event, data) {
    sockets.forEach(function(socket) {
        socket.emit(event, data);
    });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});