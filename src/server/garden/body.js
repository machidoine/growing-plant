'use strict'

var GardenElement = require('./garden-element/garden-element');

module.exports = class Body extends GardenElement {
    constructor(bodyParameter) {
        super(bodyParameter);
    }
}
