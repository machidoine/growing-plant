'use strict'
/**
 * Created by bguilloteau on 12/10/16.
 */

define(    ['garden-ui', 'remote-player', 'inventory-menu-ui'],
    (GardenUI, RemotePlayer, InventoryMenuUI) => {
        return class Game {
            constructor(phaserGame, socket) {
                this._socket = socket;
                this._phaserGame = phaserGame;

                this._gardenUI = null;
                this._remotePlayer = null;
                this._inventoryUI = null;
            }

            start() {
                this._gardenUI = new GardenUI(this,  this._phaserGame.add.group());
                this._remotePlayer = new RemotePlayer(this, this._socket)
                this._inventoryUI = new InventoryMenuUI(this, {
                    seed : 0,
                    stem : 0
                });
            }

            get phaserGame() {
                return this._phaserGame;
            }

            changeGridWith(gridReceived) {
                this._gardenUI.changeGridWith(gridReceived);
            }

            addGridElement(x, y, type, direction) {
                this._remotePlayer.addGridElement(x, y, type, direction);
                this._inventoryUI.isSelected = false;
            }

            makeSelectableFor(elementType) {
                this._gardenUI.makeSelectableFor(elementType);
            }

            updateInventory(stock) {
                this._inventoryUI.stock = stock;
            }
        }
    }
);
