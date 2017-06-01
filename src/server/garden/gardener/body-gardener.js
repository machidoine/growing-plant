'use strict'

let Gardener = require('./gardener');

module.exports = class BodyGardener extends Gardener {
    constructor(garden, body) {
        super(garden);
        this._body = body;
    }

    workOnPlant(attacker) {
        let sourcePlant = this.garden.getPlantById(this._body.plant.seed.id);
        if (attacker.seed.team != sourcePlant.seed.team) {
            attacker.attack(sourcePlant);
        }
    }

    plant(seed) {}

    addStem(stemData) {}

}
