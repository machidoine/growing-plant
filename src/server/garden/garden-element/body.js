'use strict'

let GardenElement = require('./garden-element');

module.exports = class Body extends GardenElement {
    constructor(bodyParameter, plant) {
        super(bodyParameter);
        this._plant = plant;
    }

    get plant() {
        return this._plant;
    }
}
