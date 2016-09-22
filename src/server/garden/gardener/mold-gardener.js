'use strict'

var Gardener = require('./gardener');

module.exports = class MoldGardener extends Gardener {
    constructor(garden, mold) {
        super(garden);
        this._mold = mold;
    }

    workOnPlant(plant) {
        plant.grow();
    }
}
