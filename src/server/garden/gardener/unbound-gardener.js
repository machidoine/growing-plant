'use strict'

var Gardener = require('./gardener');

module.exports = class UnboundGardener extends Gardener {
    constructor(garden, plant) {
        super(garden);
    }

    workOnPlant(plant) {
    }

    plant(seed) {}

}
