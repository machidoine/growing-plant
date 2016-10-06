'use strict'

var Gardener = require('./gardener');

module.exports = class PlantGardener extends Gardener {
    constructor(garden, plant) {
        super(garden);
        this._plant = plant;
    }

    workOnPlant(plant) {
        if(this._plant === plant) {
            this.garden.replaceByMold(plant);
        }
    }

    plant(seed) {}

    addStem(stemData) {}

}
