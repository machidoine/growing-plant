'use strict'

/**
 * Created by bguilloteau on 06/10/16.
 */
define(['./sprite-factory', 'direction-selector-ui', 'Phaser'], (SpriteFactory, DirectionSelectorUI, Phaser) => {
    return class GardenElementPlacer {
        constructor(garden, socket) {
            this._garden = garden;
            this._socket = socket;
            this._currentElement = 'seed';


            this._backgroundSprite = SpriteFactory.instance.createBackgroundSprite(this.onBackgroundClicked.bind(this));
            this._backgroundSprite.visible = false;
            this._directionSelector = new DirectionSelectorUI(garden, this.onDirectionSelected.bind(this));
        }

        addElement(type) {
            this._currentElement = type;
            this._backgroundSprite.visible = true;
        }

        onBackgroundClicked(sprite, pointer, c) {
            this._directionSelector.x = this._garden.game.math.snapToFloor(pointer.x, 25) + 12.5;
            this._directionSelector.y = this._garden.game.math.snapToFloor(pointer.y, 25) + 12.5;

            this._directionSelector.visible = true;
        }

        onDirectionSelected(x, y, direction) {
            this._garden.addGridElement(x, y, this._currentElement, direction);
            this._backgroundSprite.visible = false;
        }
    }
});