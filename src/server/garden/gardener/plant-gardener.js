'use strict'

var Gardener = require('./gardener');

module.exports = class PlantGardener extends Gardener {
    constructor(garden, plant) {
        super(garden);
        this._plant = plant;
    }

    workOnPlant(plant) {
        if(this.plant.seed === plant.seed && this.plant.team === plant.team) {
            this.garden.replaceByMold(plant);
        }
    }

}
