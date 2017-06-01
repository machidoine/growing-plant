'use strict'

let Gardener = require('./gardener');

module.exports = class NoElementGardener extends Gardener {
    constructor(garden) {
        super(garden);
    }

    doIfFertile(seed, callback) {
        return this._garden.plants
            .filter((p) => p.seed.skills.fertility)
            .find((plant) => {
                return this.isInRange(plant.position, plant.seed.skills.fertility || 0, seed.position)
            }) ? callback() : false;
    }

    isInRange(center, radius, position) {
        return Math.abs(center.x - position.x) <= radius + 1 && Math.abs(center.y - position.y) <= radius + 1;
    }

}

