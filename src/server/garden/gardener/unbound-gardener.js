'use strict'

let Gardener = require('./gardener');

module.exports = class UnboundGardener extends Gardener {
    constructor(garden, plant) {
        super(garden);
    }

    workOnPlant(plant) {
    }

};
