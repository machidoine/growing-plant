/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

module.exports = class RemotePlayer {
    constructor(settings) {
        this.game = settings.game;
        this._socket = settings.socket;
        this._color = settings.color;
        this._team = settings.team;
        this._inventory = settings.inventory;

        this._socket.on('addGridElement',  (gridElement) => {
            gridElement.color = this._color;
            gridElement.team = this._team;

            this._inventory.provide(gridElement.type, () => {
                this.game.addGridElement(gridElement);
                this.sendInventory();
            });

        });
    }

    updateGrid(grid) {
        this._socket.emit('gridElementReceive', grid);
    }

    sendInventory() {
        this._socket.emit('updateInventory', this._inventory.stock);
    }

}
