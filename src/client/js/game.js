'use strict'
/**
 * Created by bguilloteau on 12/10/16.
 */

define(    ['garden-ui', 'remote-player'],
    (GardenUI, RemotePlayer) => {
        return class Game {
            constructor(phaserGame, socket) {
                this._socket = socket;
                this._phaserGame = phaserGame;

                this._gardenUI = null;
                this._remotePlayer = null;
            }

            start() {
                this._gardenUI = new GardenUI(this,  this._phaserGame.add.group());
                this._remotePlayer = new RemotePlayer(this, this._socket);
            }

            get phaserGame() {
                return this._phaserGame;
            }

            changeGridWith(gridReceived) {
                this._gardenUI.changeGridWith(gridReceived);
            }

            addGridElement(x, y, type, direction) {
                this._remotePlayer.addGridElement(x, y, type, direction);
            }
        }
    }
);
