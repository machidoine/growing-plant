'use strict'

let Gardener = require('./gardener');

module.exports = class PlantGardener extends Gardener {
    constructor(garden, plant) {
        super(garden);
        this._plant = plant;
    }

    workOnPlant(plant) {

    }

    plant(seed) {}

    addStem(stemData) {}

}
