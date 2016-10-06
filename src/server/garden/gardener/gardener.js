'use strict'

module.exports = class Gardener {
    constructor(garden) {
        this._garden = garden;
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

    addStem(stemData) {
        var stem = this._garden.gardenElementFactory.createStem(stemData);
        this._garden.stemLayer.addElement(stem);
    }

    get garden() {
        return this._garden;
    }

}
