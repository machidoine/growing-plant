/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

var RemotePlayer = require('./remote-player');
var Garden = require('./garden');
var Grid = require('./grid');


module.exports = class Game {
    constructor() {
        this.garden = null;
        this.remotePlayers = [];
    }

    start() {
        var plantGrid = new Grid(width, height);
        this.garden = new Garden(width, height, plantGrid);
    }

    newRemotePlayer(socket) {
        this.remotePlayers.push(new RemotePlayer(socket));
    }
}
