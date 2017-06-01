'use strict'

let Gardener = require('./gardener');

module.exports = class PlantGardener extends Gardener {
    constructor(garden, plant) {
        super(garden);
        this._plant = plant;
    }

    workOnPlant(attacker) {
        if (attacker.seed.team != this._plant.seed.team) {
            attacker.attack(this._plant);
        }
    }

    plant(seed) {}

}
