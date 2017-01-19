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

module.exports = class Game {
    constructor() {
        this.garden = null;
        this.players = [];
        this.lastHashGrid = "";
    }

    start() {
        let plantGrid = new Grid(config.game.world.width, config.game.world.height);
        this.garden = new Garden(plantGrid);

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
        let hashGrid = hash(grid)
        if(hashGrid !== this.lastHashGrid) {
            this.players.forEach((player) => {
                player.updateGrid(grid);
            });
            this.lastHashGrid = hashGrid;
        }

        this.players.forEach((player) => {
            player.sendInventory();
        });

    }

    addGridElement(gardenElement) {    // TODO rename this method
        this.garden.addElement(gardenElement);

        this.broadcastUpdateGrid();
    }

}
