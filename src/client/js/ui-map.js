'use strict'

/**
 * Created by bguilloteau on 06/10/16.
 */
define(['./constants'], (Constants) => {
    return class UIMap {
        constructor(game, socket) {
            this._game = game;
            this._socket = socket;
            this._backgroundSprite = this.createBackgroundSprite(game);
            this._backgroundSprite.events.onInputDown.add(this.onBackgroundClicked.bind(this));
            this._backgroundSprite.input.priorityID = 0; // lower priority

            this._stemGroup = this._game.add.group();
            this._stemGroup.add(this.createStemSprite(game, 0, -25, 'up'));
            this._stemGroup.add(this.createStemSprite(game, 0, 25, 'down'));
            this._stemGroup.add(this.createStemSprite(game, 25, 0, 'right'));
            this._stemGroup.add(this.createStemSprite(game, -25, 0, 'left'));

            var stemBgSprite = this.createBackgroundSprite(game);
            stemBgSprite.input.priorityID = 1;
            stemBgSprite.events.onInputDown.add(this.onBackgroundStemClicked.bind(this));

            this._stemLayout = this._game.add.group();
            this._stemLayout.add(stemBgSprite);
            this._stemLayout.add(this._stemGroup);

            this._stemLayout.visible = false;
        }

        createStemSprite(game, x, y, direction) {
            var stemSprite = game.add.sprite(x, y, 'plant-textures', 'ui-arrow-top');
            stemSprite.inputEnabled = true;
            stemSprite.input.priorityID = 2;
            stemSprite.anchor.setTo(0.5, 0.5);
            stemSprite.angle = Constants.directions[direction];
            stemSprite.events.onInputDown.add(this.onStemClicked.bind(this));
            stemSprite.direction = direction;
            return stemSprite;
        }


        createBackgroundSprite(game) {
            var bg = game.add.sprite(0, 0);
            bg.scale.setTo(game.width, game.height);
            bg.inputEnabled = true;

            return bg;
        }

        onLeftClick(x, y) {

        }

        onRightClick(x, y) {

        }

        onBackgroundClicked(sprite, pointer, c) {
            this._stemGroup.x = this._game.math.snapToFloor(pointer.x, 25) + 12.5;
            this._stemGroup.y = this._game.math.snapToFloor(pointer.y, 25) + 12.5;

            this._stemLayout.visible = true;
        }

        onBackgroundStemClicked() {
            this._stemLayout.visible = false;
        }

        onStemClicked(stemSprite, pointer) {
            console.log(stemSprite);
            this._stemLayout.visible = false;

            var x = this._game.math.snapToFloor(this._stemGroup.x, 25) / 25;
            var y = this._game.math.snapToFloor(this._stemGroup.y, 25) / 25;

            var type = 'nothing';
            if (pointer.leftButton.isDown) {
                type = 'stem';
            } else {
                type = 'seed';
            }

            this._socket.emit('addGridElement', {position: {x: x, y: y}, type: type, direction: stemSprite.direction});
        }
    }
});