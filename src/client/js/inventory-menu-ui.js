'use strict'
/**
 * Created by bguilloteau on 12/10/16.
 */

define(['sprite-factory', 'inventory-element-sprite'],
    (SpriteFactory, InventoryElementSprite) => {
        class GenericModelUI {
            constructor(value) {
                this._value = value;
            }

            get value() {
                return this._value;
            }

            set value(value) {
                this._value = value;
            }
        }

        class NumberSprite extends Phaser.Text {
            constructor(game, x, y, numberModel, modelPath) {
                super(game, x, y, 'AAAAA');
                this._numberModel = numberModel;
                this._modelPath = modelPath;
            }

            update() {
                this.text = "x" + this._numberModel.value[this._modelPath];
            }
        }

        class CaseSprite extends Phaser.Sprite {
            constructor(game, x, y, elementSpriteName, numberModel, modelPath) {
                super(game, x, y, 'plant-textures', elementSpriteName);
                this._numberModel = numberModel;
                this._modelPath = modelPath;

                this.stemNumber = new NumberSprite(game, 30, 0, numberModel, modelPath);
                this.addChild(this.stemNumber);
            }

            update() {
                this.stemNumber.update();
                if(this.isEmpty) {
                    this.alpha = 0.2;
                } else {
                    this.alpha = 1;
                }
            }

            get isEmpty() {
                return this._numberModel.value[this._modelPath] <= 0;
            }
        }

        return class InventoryMenuUI {
            constructor(game, stock) {
                this._game = game;
                this._stockModel = new GenericModelUI(stock);

                this.stemSprite = new CaseSprite(this._game.phaserGame, 0, 0, 'stem-team1',  this._stockModel, 'stem');
                this.stemSprite.name = 'stem';

                this.seedSprite = new CaseSprite(this._game.phaserGame, 0, 30, 'seed-team1',  this._stockModel, 'seed');
                this.seedSprite.name = 'seed';

                this._selector = this._game.phaserGame.add.graphics(0, 0);
                this._selector.lineStyle(4, 0x0000FF, 1);
                this._selector.drawRect(-2, -2, 30, 30);
                this._selector.visible = false;

                var inventoryGroup = this._game.phaserGame.add.group();

                inventoryGroup.add(this.stemSprite);
                inventoryGroup.add(this.seedSprite);
                inventoryGroup.add(this._selector);

                inventoryGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onMenuElementClicked, this);
                inventoryGroup.setAll('inputEnabled', true);

                inventoryGroup.x = 900;
                inventoryGroup.y = 50;
            }

            onMenuElementClicked(sprite, pointer) {
                if(sprite.isEmpty) {
                    return;
                }

                this._selector.x = sprite.x;
                this._selector.y = sprite.y;
                this._selector.selectedSprite = sprite;
                this._selector.visible = true;

                this._game.makeSelectableFor(sprite.name);
            }

            set stock(stock) {
                this._stockModel.value = stock;
            }

            set isSelected(spriteName) {
                this._selector.visible = false;
                this._selector.selectedSprite = null;
            }
        }
    }
)
