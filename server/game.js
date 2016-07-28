/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

var RemotePlayer = require('./remote-player');
var Garden = require('./garden');
var Grid = require('./grid');
var constants = require('./constants');


module.exports = class Game {
    constructor() {
        this.garden = null;
        this.remotePlayers = [];
    }

    start() {
        var plantGrid = new Grid(32, 24); // TODO externalize with and height
        this.garden = new Garden(plantGrid);
        this.garden.addSeed({'position': {'x': 2, 'y': 20}, direction: "down", 'type': 'seed', 'team': 'team3'});

        this.startWorldTime();
    }

    addRemotePlayer(socket) {
        var playerSettings = {
            color: constants.color[Math.floor(Math.random() * 3)],
            team: constants.team[Math.floor(Math.random() * 3)]
        }

        var remotePlayer = new RemotePlayer(this, socket, playerSettings);
        remotePlayer.updateGrid(this.garden.getRawGrid());

        this.remotePlayers.push(remotePlayer);
    }

    startWorldTime() {
        var me = this;
        setInterval(function () {
            me.garden.grow();

            me.broadcastUpdateGrid();

        }, 1000); // TODO externalize time to refresh
    }

    broadcastUpdateGrid(data) {
        var me = this;
        this.remotePlayers.forEach(function (player) {
            player.updateGrid(me.garden.getRawGrid());
        });
    }

    addGridElement(gardenElement) {    // TODO rename this method
        this.garden.addElement(gardenElement);

        this.broadcastUpdateGrid();
    }

}
