/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

let RemoteEventHandler = require('./remote-event-handler');
let SeedLab = require('../inventory/seed-lab');
let hash = require('object-hash');

module.exports = class Player {
    constructor(settings) {
        this._socket = settings.socket;

        this.game = settings.game;
        this._garden = settings.garden;

        this._color = settings.color;
        this._team = settings.team;
        this._inventory = settings.inventory;
        this._lastInventoryHash = "";

        this._remoteEventHandler = new RemoteEventHandler(settings.socket);
        this._seedLab = new SeedLab();

        this.initComingEvent();
    }

    initComingEvent() {
        this._remoteEventHandler.init(this);
        this._garden.addNewSeedPresentForTeam(this._team, this.newSeedPresentEvent.bind(this));
    }

    updateGrid(grid) {
        this._remoteEventHandler.sendEvent.gridElementReceive(grid);
    }

    sendInventory() {
        let stock = this._inventory.stock;
        let hashStock = hash(stock);
        if(hashStock !== this._lastInventoryHash) {
            this._remoteEventHandler.sendEvent.updateInventory(stock);
            this._lastInventoryHash = hashStock;
        }
    }

    onCombineSeed(seedIds) {
        this._inventory.useSeeds(seedIds, (seeds) => {
            return this._seedLab.combineSeeds(seeds, (newSeed) => {
                return this._inventory.add(newSeed);
            });
        });

        this.sendInventory();
    }

    onAddSeed(seedId, position, direction) {
        // checkPosition(position);
        this._inventory.provide(seedId, (seed) => {
            seed.position = position;
            seed.direction = direction;
            seed.team = this._team;
            seed.type = 'seed';
            return this._garden.addSeed(seed);
        });

        this.game.broadcastUpdateGrid();
    }

    onGetInventory() {
        this.sendInventory();
    }

    onRemoveSeed(seedId) {
        this._garden.removePlant(seedId);
        this.game.broadcastUpdateGrid();
    }

    onChangeSeedDirection(seedId, direction) {
        this._garden.changePlantDirection(seedId, direction);
        this.game.broadcastUpdateGrid();
    }

    onAddGridElement(gridElement) {
        gridElement.color = this._color;
        gridElement.team = this._team;

        this._inventory.provide(gridElement.type, () => {
            this.game.addGridElement(gridElement);
            this.sendInventory();
        });
    }

    newSeedPresentEvent(seeds) {
        this._inventory.addAll(seeds);
        this.sendInventory();
    }
}
