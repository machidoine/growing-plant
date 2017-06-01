/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

let RemoteEventHandler = require('./remote-event-handler');
let SeedLab = require('../inventory/seed-lab');
let hash = require('object-hash');
let utils = require('./../utils/utils');

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
        let hashedGrid = this.hashAllElement(grid);
        this._remoteEventHandler.sendEvent.gridElementReceive({seeds : hashedGrid}); // TODO ce ne sont pas des seeds, il faudra le changer
    }

    hashAllElement(grid) {
        return grid.map((e) => {
            let cloned = utils.clone(e);
            cloned.hash = hash(e);
            return cloned;
        });
    }


    sendInventory() {
        let stock = this._inventory.stock;
        let hashStock = hash(stock);
        if(hashStock !== this._lastInventoryHash) {
            this._remoteEventHandler.sendEvent.updateInventory({seeds : stock});
            this._lastInventoryHash = hashStock;
        }
    }

    onCombineSeeds(args) {
        this._inventory.useSeeds(args.seeds, (seeds) => {
            return this._seedLab.combineSeeds(seeds, (newSeed) => {
                return this._inventory.add(newSeed);
            });
        });

        this.sendInventory();
    }

    onAddSeed(args) { // seedId, position, direction
        console.log(args.seedId);
        console.log(args.position);
        console.log(args.direction);

        this._inventory.provide(args.seedId, (seed) => {
            seed.position = args.position;
            seed.direction = args.direction;
            seed.team = this._team;
            seed.type = 'seed';
            return this._garden.addSeed(seed);
        });

        this.game.broadcastUpdateGrid();
    }

    onGetInventory() {
        this.sendInventory();
    }

    onRemoveSeed(args) {
        console.log("remove seed ", args.seedId);
        this._garden.removePlant(args.seedId, this._team);
        this.game.broadcastUpdateGrid();
    }

    onChangeSeedDirection(args) {
        this._garden.changePlantDirection(args.seedId, args.direction);
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

    get team() {
        return this._team;
    }
}
