'use strict'

var Gardener = require('./gardener');
var constants = require('./../../utils/constants');

module.exports = class StemGardener extends Gardener {
    constructor(garden, stem) {
        super(garden);
        this._stem = stem;
    }

    workOnPlant(plant) {
        super.workOnPlant(plant);

        if(this._stem.team === plant.team) {
            if(this.isOpposite(plant.direction)) {
                plant.direction = this._stem.direction;
            }

            this._garden.stemLayer.removeElement(this._stem);
        }

    }

    isOpposite(direction) {
        return !(constants.directions[direction].x + constants.directions[this._stem.direction].x === 0 && constants.directions[direction].y + constants.directions[this._stem.direction].y === 0);
    }


    plant(seed) {}

    addStem(stemData) {}

}
