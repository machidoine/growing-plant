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

    doIfFertile(seed, callback) {
        return false;
    }

    get garden() {
        return this._garden;
    }

}
