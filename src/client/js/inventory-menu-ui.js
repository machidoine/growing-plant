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
                stemSprite.y = 25;
                stemSprite.name = 'stem';

                var inventoryGroup = this._game.phaserGame.add.group();
                inventoryGroup.add(seedSprite);
                inventoryGroup.add(stemSprite);

                inventoryGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onMenuElementClicked, this);
                inventoryGroup.setAll('inputEnabled', true);

                inventoryGroup.x = 900;
                inventoryGroup.y = 50;
            }

            onMenuElementClicked(sprite, pointer) {
                this._game.makeSelectableFor(sprite.name);
            }
        }
    }
)
