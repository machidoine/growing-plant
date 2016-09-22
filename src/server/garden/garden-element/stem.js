'use strict'

var GardenElement = require('./garden-element');

module.exports = class Stem extends GardenElement {
    constructor(stemParameter) {
        super(stemParameter);
    }

    get direction() {
        return this.data.direction;
    }

}
