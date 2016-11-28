'use strict';
/**
 * Created by bguilloteau on 12/10/16.
 */

define(['jquery','garden-element-map', 'garden-element-placer'],
    ($, GardenElementMap, GardenElementPlacer) => {
        return class Player {
            constructor(game, socket) {
                this._game = game;
                this._socket = socket;

                this.handleRemoteEvent();
            }

            handleRemoteEvent() {
                this._socket.on('myConnect', (gridReceived) => {
                    this._game.changeGridWith(gridReceived);
                    console.log('receive connect');
                });

                this._socket.on('gridElementReceive', (gridReceived) => {
                    $('.debug').html(JSON.stringify(gridReceived, null, 4));
                    this._game.changeGridWith(gridReceived);
                    console.log('receive gridElementReceive');
                });

                this._socket.on('updateInventory', (stock) => {
                    this._game.updateInventory(stock);
                    //console.log(stock);

                    $('.inventory').html(JSON.stringify(stock, null, 4));
                });
            }

            addGridElement(x, y, type, direction) {
                console.log('send addGridelement');
                this._socket.emit('addGridElement', {position: {x: x, y: y}, type: type, direction: direction});
            }
        }
    }
);