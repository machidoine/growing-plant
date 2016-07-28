/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

module.exports = class RemotePlayer {
    constructor(game, socket, settings) {
        this.game = game;
        this._socket = socket;
        this.settings = settings;

        var me = this;
        this._socket.on('addGridElement', function (gridElement) {
            gridElement.color = settings.color;
            gridElement.team = settings.team;

            me.game.addGridElement(gridElement);
        });
    }

    updateGrid(grid) {
        this._socket.emit('gridElementReceive', grid);
    }

}
