/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

let Player = require('./player');
let Garden = require('./../garden/garden');
let Grid = require('./../layer/grid');
let constants = require('./../utils/constants');
let Inventory = require('./../inventory/inventory');
let config = require('../config');
let hash = require('object-hash');
let utils = require('./../utils/utils')
let InfiniteBoundaries = require('./../garden/infinite-boundaries');

module.exports = class Game {
    constructor() {
        this.garden = null;
        this.players = [];
        this.lastHashGrid = "";
    }

    start() {
        this.garden = new Garden(new InfiniteBoundaries());

        this.startWorldTime();
    }

    addPlayer(socket) {
        let player = new Player({
            socket: socket,
            game: this,
            garden: this.garden,
            color: constants.color[Math.floor(Math.random() * 3)],
            team: constants.team[Math.floor(Math.random() * 3)],
            inventory: Inventory.create()
        });

        player.sendInventory();
        player.updateGrid(this.garden.getRawGrid());

        this.players.push(player);
    }

    startWorldTime() {
        setInterval(() => {
            this.garden.changeToNextDay();

            this.broadcastUpdateGrid();

        }, config.game.world.refreshTime);
    }

    broadcastUpdateGrid() {
        let grid = this.garden.getRawGrid();
        let hashedGrid = this.hashAllElement(grid);
        let hashGrid = hash(hashedGrid)
        if (hashGrid !== this.lastHashGrid) {
            this.players.forEach((player) => {
                player.updateGrid(hashedGrid);
            });
            this.lastHashGrid = hashGrid;
        }

        this.players.forEach((player) => {
            player.sendInventory();
        });

    }

    hashAllElement(grid) {
        return grid.map((e) => {
            let cloned = utils.clone(e);
            cloned.hash = hash(e);
            return cloned;
        });
    }

    addGridElement(gardenElement) {    // TODO rename this method
        this.garden.addElement(gardenElement);

        this.broadcastUpdateGrid();
    }

}
