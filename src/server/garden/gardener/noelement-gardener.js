'use strict'

var Gardener = require('./gardener');

module.exports = class NoElementGardener extends Gardener {
    constructor(garden) {
        super(garden);
    }

    workOnPlant(plant) {
        if(typeof plant === 'undefined') {
            throw new Error('plant must be provided to grow');
        }

        plant.grow();
    }

    plant(seed) {
        var plant = this._garden.gardenElementFactory.createPlant(seed);
        this._garden.plantLayer.addElement(plant);
        this._garden.plants.push(plant);
    }

    addStem(stem) {
        var stem = this._garden.gardenElementFactory.createStem(stem);
        this._garden.stemLayer.addElement(stem);
    }

}

