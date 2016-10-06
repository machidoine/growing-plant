'use strict'

var Gardener = require('./gardener');

module.exports = class NoElementGardener extends Gardener {
    constructor(garden) {
        super(garden);
    }
}

