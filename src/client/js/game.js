'use strict'
/**
 * Created by bguilloteau on 12/10/16.
 */

var s;

define(    ['garden-ui', 'player', 'inventory-menu-ui'],
    (GardenUI, Player, InventoryMenuUI) => {
        return class Game {
            constructor(phaserGame, socket) {
                s = socket;
                this._socket = socket;
                this._phaserGame = phaserGame;

                this._gardenUI = null;
                this._player = null;
                this._inventoryUI = null;
            }

            start() {
                this._gardenUI = new GardenUI(this,  this._phaserGame.add.group());
                this._player = new Player(this, this._socket)
                this._inventoryUI = new InventoryMenuUI(this, {
                    seed : 0,
                    stem : 0
                });
            }

            get phaserGame() {
                return this._phaserGame;
            }

            changeGridWith(gridReceived) {
                this._gardenUI.changeGridWith(gridReceived.seeds);
            }

            addGridElement(x, y, type, direction) {
                this._player.addGridElement(x, y, type, direction);
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
