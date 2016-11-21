/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

var Player = require('./player');
var Garden = require('./../garden/garden');
var Grid = require('./../layer/grid');
var constants = require('./../utils/constants');
var Inventory = require('./../inventory/inventory');


module.exports = class Game {
    constructor() {
        this.garden = null;
        this.players = [];
    }

    start() {
        var plantGrid = new Grid(32, 24); // TODO externalize with and height
        this.garden = new Garden(plantGrid);
        this.garden.addSeed({'position': {'x': 2, 'y': 20}, direction: "down", 'type': 'seed', 'team': 'team3'});

        this.startWorldTime();
    }

    addPlayer(socket) {
        var player = new Player( {
            game : this,
            socket : socket,
            color: constants.color[Math.floor(Math.random() * 3)],
            team: constants.team[Math.floor(Math.random() * 3)],
            inventory : Inventory.create()
        });

        player.sendInventory();
        player.updateGrid(this.garden.getRawGrid());

        this.players.push(player);
    }

    startWorldTime() {
        var me = this;
        setInterval(function () {
            me.garden.changeToNextDay();

            me.broadcastUpdateGrid();

        }, 1000); // TODO externalize time to refresh
    }

    broadcastUpdateGrid(data) {
        var me = this;
        this.players.forEach(function (player) {
            player.updateGrid(me.garden.getRawGrid());
        });
    }

    addGridElement(gardenElement) {    // TODO rename this method
        this.garden.addElement(gardenElement);

        this.broadcastUpdateGrid();
    }

}
