'use strict';
/**
 * Created by bguilloteau on 03/11/16.
 */

define(['Phaser'],
    (Phaser) => {
        class NumberSprite extends Phaser.Text {
            constructor(game, x, y, numberModel, modelPath) {
                super(game, x, y, '');
                this._numberModel = numberModel;
                this._modelPath = modelPath;
            }

            update() {
                this.text = "x" + this._numberModel[this._modelPath];
            }
        }

        class CaseSprite extends Phaser.Sprite {
            constructor(game, x, y, elementSpriteName, numberModel, modelPath) {
                super(game, x, y, 'plant-textures', elementSpriteName);
                this._numberModel = numberModel;
                this._modelPath = modelPath;
            }

            update() {
                // mettre à jour le sprite ou changer l'opacité
            }
        }

        return class InventoryElementSprite {
            constructor(game, x, y, elementSpriteName, numberModel, modelPath) {
                this.numberModel = new NumberSprite(game, x, y, numberModel, modelPath);
                this.caseSprite = new CaseSprite(game, x, y, elementSpriteName, numberModel, modelPath);

                this._group = game.add.group();
                this._group.add(this.numberModel);
                this._group.add(this.caseSprite);
            }

            get group() {
                return this._group;
            }

        }
    });

