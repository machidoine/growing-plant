'use strict'

var Gardener = require('./gardener');

module.exports = class NoElementGardener extends Gardener {
    constructor(garden) {
        super(garden);
    }

    workOnPlant(plant) {
        plant.grow();
    }

    plant(seed) {
        var plant = this._garden.gardenElementFactory.createPlant(seed);
        this._garden.plantLayer.addElement(plant);
        this._garden.plants.push(plant);
    }

}

