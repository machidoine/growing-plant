'use strict';

/**
 * Created by bguilloteau on 12/10/16.
 */
define(    ['garden-element-map', 'garden-element-placer'],
    (GardenElementMap, GardenElementPlacer) => {
    return class GardenUI {
        constructor(game, container, socket) {
            this._game = game;
            this._socket = socket;
            this._container = container;

            this._gardenElementMap = new GardenElementMap(container);
            this._gardenElementPlacer = new GardenElementPlacer(this, this._socket);
        }

        get game() {
            return this._game.phaserGame;
        }

        get container() {
            return this._container;
        }

        addGroup() {
            return this.game.add.group();
        }

        changeGridWith(grid) {
            this._gardenElementMap.replaceBy(grid);
        }

        addGridElement(x, y, type, direction) {
            this._game.addGridElement(x, y, type, direction);
        }
    }
});
