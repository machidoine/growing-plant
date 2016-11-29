'use strict'

let Gardener = require('./gardener');

module.exports = class BodyGardener extends Gardener {
    constructor(garden, body) {
        super(garden);
        this._body = body;
    }

    workOnPlant(plant) {

    }

    plant(seed) {}

    addStem(stemData) {}

}
