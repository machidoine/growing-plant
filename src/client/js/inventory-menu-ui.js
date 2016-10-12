'use strict'
/**
 * Created by bguilloteau on 12/10/16.
 */

define(['sprite-factory'],
    (SpriteFactory) => {
        return class InventoryMenuUI {
            constructor(game, inventory) {
                this._game = game;
                this._inventory = inventory;

                var seedSprite =  this._game.phaserGame.add.sprite(0, 0, 'plant-textures', 'seed-team1');
                seedSprite.x = 0;
                seedSprite.y = 0;
                seedSprite.name = 'seed';

                var stemSprite =  this._game.phaserGame.add.sprite(0, 0, 'plant-textures', 'stem-team1');
                stemSprite.x = 0;
                stemSprite.y = 30;
                stemSprite.name = 'stem';

                this._selector = this._game.phaserGame.add.graphics(0, 0);
                this._selector.lineStyle(4, 0x0000FF, 1);
                this._selector.drawRect(-2, -2, 30, 30);
                this._selector.visible = false;

                var inventoryGroup = this._game.phaserGame.add.group();
                inventoryGroup.add(seedSprite);
                inventoryGroup.add(stemSprite);
                inventoryGroup.add(this._selector);

                inventoryGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onMenuElementClicked, this);
                inventoryGroup.setAll('inputEnabled', true);

                inventoryGroup.x = 900;
                inventoryGroup.y = 50;



            }

            onMenuElementClicked(sprite, pointer) {
                this._selector.x = sprite.x;
                this._selector.y = sprite.y;
                this._selector.selectedSprite = sprite;
                this._selector.visible = true;

                this._game.makeSelectableFor(sprite.name);
            }

            set isSelected(spriteName) {
                this._selector.visible = false;
                this._selector.selectedSprite = null;
            }
        }
    }
)
