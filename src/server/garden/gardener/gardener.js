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
        let plant = this._garden.gardenElementFactory.createPlant(seed);
        this._garden.plantLayer.addElement(plant);
        this._garden.plants.push(plant);
    }

    get garden() {
        return this._garden;
    }

}
