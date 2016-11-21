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
            var spriteProperties = GardenElementSpritePropertiesProvider.provide(gardenElement);

            var sprite = this.group.create(0, 0, 'plant-textures', spriteProperties.name);
            sprite.anchor.setTo(0.5, 0.5);
            sprite.angle = spriteProperties.angle;
            sprite.x = sprite.width * gardenElement.position.x + 12.5;
            sprite.y = sprite.height * gardenElement.position.y + 12.5;
        }

        clear() {
            this.group.removeAll();
        }

        addAll(gardenElements) {
            var me = this;
            gardenElements.forEach(function (gardenElement) {
                me.add(gardenElement);
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