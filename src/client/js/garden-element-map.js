'use strict'

/**
 * Created by bguilloteau on 06/10/16.
 */
class GardenElementMap  {
    constructor(game) {
        this.game = game;
        this.group = game.add.group();
        this._sprites = [];
    }

    add(gardenElement) {
        var sprite = this.group.create(0, 0, 'plant-textures', gardenElement.type + '-' + gardenElement.team);
        /*sprite.rotation = directions[plan.direction];
         sprite.pivot.x = sprite.x + 12.5;
         sprite.pivot.y = sprite.y + 12.5;
         sprite.anchor.setTo(0,0);
         sprite.pivot.x = sprite.x + 12.5;
         sprite.pivot.y = sprite.y + 12.5;*/
        sprite.anchor.setTo(0.5, 0.5);
        sprite.angle = Constants.directions[gardenElement.direction];
        sprite.x = sprite.width * gardenElement.position.x + 12.5;
        sprite.y = sprite.height * gardenElement.position.y + 12.5;
    }

    spriteInputListener(e) {
        console.log('clicked');
        console.log(e);
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
