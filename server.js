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
io.set('log level', 1);

router.use(express.static(path.resolve(__dirname, 'client')));

var sockets = [];
var players = {};
var color = ["blue", "red", "black"];
var team = ["team1", "team2", "team3"];

var Garden = class {
    constructor(width, height, plantGrid) {
        this.width = width;
        this.height = height;
        this.boundaries = new GardenBoundaries(this);
        this._plantGrid = plantGrid;
        this._plants = [];
        this._stems = [];
        this._stemGrid = new Grid(width, height);
        this._molds = [];
        this._moldGrid = new Grid(width, height);
    }

    addSeed(seed) {

        if (this.allowAddHere(seed.position)) {
            console.log('addSeed');
            var start = new Date().getTime();

            this._plantGrid.addPoint(seed);

            this._plants.push(new Plant(this, seed));
            // or ?
            // this._plants[this.getIndex(seed.position)] = new Plant(this, seed);

            var end = new Date().getTime();
            var elapse = end - start;
            console.log('push plant : ' + elapse);
        }
    }

    addStem(stem) {
        if (this.allowAddHere(stem.position)) {
            this._stemGrid.addPoint(stem);
        }
    }

    addBody(body) {
        this._plantGrid.addPoint(body);
    }

    getIndex(position) {
        return position.y * this.width + position.x;
    }

    get plants() {
        return this._plants;
    }

    consumeStem(element) {
        var stem = this._stemGrid.getPoint(element.position);

        if (typeof stem !== 'undefined' && stem.team === element.team) {
            this._stemGrid.removePoint(stem);
            return stem.direction;
        }

        return element.direction;
    }

    get plantGrid() {
        return this._plantGrid;
    }

    get stemGrid() {
        return this._stemGrid;
    }

    get moldGrid() {
        return this._moldGrid;
    }

    allowAddHere(point) {
        return typeof this._plantGrid.getPoint(point) === 'undefined' && this.boundaries.isIn(point);
    }

    replaceByMoldIfOut(plant, newBody) {
        if (this.boundaries.isOut(newBody.position)) {
            this.replaceByMold(plant);
        }
    }

    replaceByMold(plant) {
        var me = this;
        plant.bodies.forEach(function (el) {
            var mold = clone(el);
            mold.type = 'mold';
            me._molds.push(mold);
            me._moldGrid.addPoint(mold);

            me._plantGrid.removePoint(el);
        });

        this._plants.splice(this._plants.indexOf(plant), 1);
        this._plantGrid.removePoint(plant.seed);
    }
};

var directions = {
    "up": {x: 0, y: -1},
    "down": {x: 0, y: 1},
    "left": {x: -1, y: 0},
    "right": {x: 1, y: 0}
}

var clone = function (object) {
    return JSON.parse(JSON.stringify(object));
}

var Plant = class {
    constructor(garden, seed) {
        this.seed = seed;
        this.body = [];
        this.garden = garden;
        this.lastBody = this.seed;
        this.direction = seed.direction;
    }

    grow() {
        var newBody = clone(this.lastBody);
        newBody.type = "plant-body";

        newBody.position = this.translate(newBody.position, this.direction);

        if (garden.allowAddHere(newBody.position)) {
            console.log('can grow and grow');
            var direction = this.garden.consumeStem(newBody);
            console.log(directions[direction]);
            console.log(directions[this.direction]);
            if (directions[direction].x + directions[this.direction].x === 0 && directions[direction].y + directions[this.direction].y === 0) {
                // do nothing
            } else {
                newBody.direction = direction;
                this.direction = direction;
            }

            this.garden.addBody(newBody);
            this.body.push(newBody);
            if (this.lastBody.type !== 'seed') {
                this.lastBody.type = 'plant-body';
            }
            newBody.type = 'plant-head';
            this.lastBody = newBody;
        } else {
            this.garden.replaceByMoldIfOut(this, newBody);
        }
    }

    translate(position, direction) {
        var d = directions[direction];
        position.x += d.x;
        position.y += d.y;
        return position;
    }

    get bodies() {
        return this.body;
    }
};


var GardenGridConvertor = class {
    static toGrid(garden) {
        return garden.plantGrid.points.concat(garden.stemGrid.points).concat(garden.moldGrid.points);
    }
};

var GardenBoundaries = class {
    constructor(garden) {
        this.garden = garden;
    }

    isOut(point) {
        if (point.x >= garden.width || point.y >= garden.height || point.x < 0 || point.y < 0) {
            return true;
        }

        return false;
    }

    isIn(point) {
        return !this.isOut(point);
    }
};

var Grid = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this._points = [];
        this.initPoints();
    }

    initPoints() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this._points.push(undefined);
            }
        }
    }

    get points() {
        var p = [];
        this._points.forEach(function (e) {
            if (typeof e !== 'undefined') {
                p.push(e);
            }
        });
        return p;
    }

    getPoint(position) {
        return this._points[this.getIndex(position)];
    }

    addPoint(point) {
        this._points[this.getIndex(point.position)] = point;
    }

    getCellByType(type) {
        return this._points.filter(function (e) {
            return e.type == type;
        });
    }

    getIndex(position) {
        return position.y * this.width + position.x;
    }

    removePoint(point) {
        console.log('removePoint');
        console.log(this.points);
        this._points[this.getIndex(point.position)] = undefined;
        console.log(this.points);
    }

}

//var initialPoints = [];
//initialPoints = [{"x":0, "y":0, "type":"seed"}];
var garden = new Garden(32, 24, new Grid(32, 24));
garden.addSeed({'position': {'x': 2, 'y': 20}, direction: "down", 'type': 'seed', 'team': 'team3'});

io.on('connection', function (socket) {
    sockets.push(socket);
    players[socket.id] = {};
    players[socket.id].color = color[Math.floor(Math.random() * 3)];
    players[socket.id].team = team[Math.floor(Math.random() * 3)];

    socket.emit('myConnect', GardenGridConvertor.toGrid(garden));

    socket.on('disconnect', function () {
        sockets.splice(sockets.indexOf(socket), 1);
    });

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