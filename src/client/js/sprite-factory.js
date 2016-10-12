"use strict";

/**
 * Created by bguilloteau on 12/10/16.
 */

let instance;
define(['./constants'], (Constants) => {
    return class SpriteFactory {
        constructor() {
            this._game = null;
        }

        static get instance() {
            if(!instance) {
                instance = new SpriteFactory();
            }

            return instance;
        }

        set game(game) {
            this._game = game;
        }

        createBackgroundSprite(onInputCallback) {
            var bg = this._game.add.sprite(0, 0);
            bg.scale.setTo(this._game.width, this._game.height);
            bg.inputEnabled = true;
            bg.events.onInputDown.add(onInputCallback);

            return bg;
        }

        createArrowSprite(x, y, direction, callbackClicked, arrowSpriteName) {
            var stemSprite = this._game.add.sprite(x, y, 'plant-textures', arrowSpriteName);
            stemSprite.inputEnabled = true;
            //stemSprite.input.priorityID = priority;
            stemSprite.anchor.setTo(0.5, 0.5);
            stemSprite.angle = Constants.directions[direction];
            stemSprite.events.onInputDown.add(callbackClicked.bind(this));
            stemSprite.direction = direction;
            return stemSprite;
        }

    }
});