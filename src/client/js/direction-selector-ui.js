"use strict";
/**
 * Created by bguilloteau on 12/10/16.
 */
define(['./sprite-factory'], (SpriteFactory) => {
    return class DirectionSelectorUI {
        constructor(garden, directionSelectedCallback) {
            this._garden = garden;

            this._directionSelectedCallback = directionSelectedCallback;

            this._stemGroup =  this._garden.addGroup();
            this._stemGroup.add(SpriteFactory.instance.createArrowSprite(0, -25, 'up', this.onArrowClicked.bind(this), 'ui-arrow-top'));
            this._stemGroup.add(SpriteFactory.instance.createArrowSprite(0, 25, 'down', this.onArrowClicked.bind(this), 'ui-arrow-top'));
            this._stemGroup.add(SpriteFactory.instance.createArrowSprite(25, 0, 'right', this.onArrowClicked.bind(this), 'ui-arrow-top'));
            this._stemGroup.add(SpriteFactory.instance.createArrowSprite(-25, 0, 'left', this.onArrowClicked.bind(this), 'ui-arrow-top'));

            var directionSelectorBackgroundSprite = SpriteFactory.instance.createBackgroundSprite(this.onBackgroundArrowClicked.bind(this));

            this._directionSelectorLayout = this._garden.addGroup();
            this._directionSelectorLayout.add(directionSelectorBackgroundSprite);
            this._directionSelectorLayout.add(this._stemGroup);

            this._directionSelectorLayout.visible = false;
        }

        onBackgroundArrowClicked() {
            this._directionSelectorLayout.visible = false;
        }

        onArrowClicked(stemSprite, pointer) {
            this._directionSelectorLayout.visible = false;

            var x = this._garden.game.math.snapToFloor(this._stemGroup.x, 25) / 25;
            var y = this._garden.game.math.snapToFloor(this._stemGroup.y, 25) / 25;

            this._directionSelectedCallback(x, y, stemSprite.direction);

            // var type = 'nothing';
            // if (pointer.leftButton.isDown) {
            //     type = 'stem';
            // } else {
            //     type = 'seed';
            // }
        }

        set visible(isVisible) {
            this._directionSelectorLayout.visible = isVisible;
            console.log('set visible : ', isVisible);
        }

        set x(x) {
            this._stemGroup.x = x;
        }

        set y(y) {
            this._stemGroup.y = y;
        }
    }

})