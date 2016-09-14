/**
 * Created by benjamin on 7/29/2016.
 */
'use strict'

var Grid = require('../grid');
var Boundaries = require('../garden-boundaries');

module.exports = class Layer {
    constructor(gardenElementFactory, boundaries) {
        this._gardenElementFactory = gardenElementFactory;
        this._boundaries = boundaries;
        this._grid = new Grid(boundaries.width, boundaries.height);
        this._elements = [];
    }

    addElement(element) {
        this._elements.push(element);
        this._grid.addPoint(element);
    }

    getObjectAt(position) {
        if(this._boundaries.isOut(position)) {
            return this._gardenElementFactory.createUnboundElement();
        }

        var element = this._grid.getPoint(position);

        if(typeof element === 'undefined') {
            return this._gardenElementFactory.createNoElement();
        }
        return element;
    }

    getElementAt(position) {
        return this._grid.getPoint(position);
    }

    removeElement(element) {
        this._grid.removePoint(element);
        this._elements.splice(this._elements.indexOf(element), 1);
    }

    flatToGrid() {
        return this._grid.points.map((element) => {
            return element.data;
        });
    }

}
