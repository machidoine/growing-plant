/**
 * Created by benjamin on 7/29/2016.
 */
'use strict'

var Grid = require('../grid');

module.exports = class Layer {
    constructor(width, height) {
        this._grid = new Grid(width, height);
        this._elements = [];
    }

    addElement(element) {
        this._elements.push(element);
        this._grid.addPoint(element);
    }

}
