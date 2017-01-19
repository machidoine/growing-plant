'use strict'

/**
 * Created by bguilloteau on 06/10/16.
 */
define(['./constants', './garden-element-sprite-name-engine'], (Constants, GardenElementSpritePropertiesProvider) => {
    return class GardenElementMap {
        constructor(container) {
            this.group = container;
            this._sprites = [];
        }

        add(gardenElement) {
            let bodyProperties = GardenElementSpritePropertiesProvider.provide(gardenElement);

            this.createSprite(bodyProperties.name + '-' + gardenElement.team, bodyProperties.angle, gardenElement.position);

            Object.keys(gardenElement.skills).forEach((skill) => {
                this.createSprite(bodyProperties.name + '-' + skill, bodyProperties.angle, gardenElement.position);
            });
        }

        createSprite(name, angle, position) {
            let sprite = this.group.create(0, 0, 'plant-textures', name);
            let spritePosition = {
                x: sprite.width * position.x + 12.5,
                y: sprite.height * position.y + 12.5
            }

            sprite.anchor.setTo(0.5, 0.5);
            sprite.angle = angle;
            sprite.x = spritePosition.x;
            sprite.y = spritePosition.y;
        }


        clear() {
            this.group.removeAll();
        }

        addAll(gardenElements) {
            gardenElements.forEach((gardenElement) => {
                this.add(gardenElement);
            });
        }

        replaceBy(gardenElements) {
            this.clear();
            this.addAll(gardenElements);
            // this.group.callAll('events.onInputDown.add', 'events.onInputDown', this.spriteInputListener, this);
            // this.group.setAll('inputEnabled', true);
        }

        getCellByType(type) {
            return this._sprites.filter(function (e) {
                return e.type == type;
            });
        }

    }
});