/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

var RemoteEventHandler = require('./remote-event-handler');

module.exports = class Player {
    constructor(settings) {
        this.game = settings.game;
        this._socket = settings.socket;
        this._color = settings.color;
        this._team = settings.team;
        this._inventory = settings.inventory;
        this._remoteEventHandler = new RemoteEventHandler(settings.socket);

        this.initComingEvent();
    }

    initComingEvent() {
        this._remoteEventHandler.init(this, ['addGridElement', 'createCombinedSeed', 'addSeed', 'getInventory', 'deleteSeed', 'changeSeedDirection']);
    }

    updateGrid(grid) {
        this._remoteEventHandler.sendEvent.gridElementReceive(grid);
    }

    sendInventory() {
        this._remoteEventHandler.sendEvent.updateInventory(this._inventory.stock);
    }

    createCombinedSeed(seedIds) {

    }

    addSeed(seedId, position) {

    }

    getInventory() {

    }

    deleteSeed(seedId) {

    }

    changeSeedDirection(seedId, direction) {

    }

    addGridElement(gridElement) {
        gridElement.color = this._color;
        gridElement.team = this._team;

        this._inventory.provide(gridElement.type, () => {
            this.game.addGridElement(gridElement);
            this.sendInventory();
        });
    }
}
