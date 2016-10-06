'use strict'

var Gardener = require('./gardener');

module.exports = class BodyGardener extends Gardener {
    constructor(garden, body) {
        super(garden);
        this._body = body;
    }

    workOnPlant(plant) {
        if(this._body.plant === plant) {
            this.garden.replaceByMold(plant);
        }
    }

    plant(seed) {}

    addStem(stemData) {}

}
