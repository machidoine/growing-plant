/**
 * Created by benjamin on 7/29/2016.
 */
'use strict'

let Layer = require('./layer');

module.exports = class LayerContainer {
    constructor(gardenElementFactory, boundaries) {
        this._gardenElementFactory = gardenElementFactory;
        this._boundaries = boundaries;
        this.layers = [];
    }

    flatToGrid() {
        return this.layers.reduce((previousElement, currentElement) => {
            return previousElement.concat(currentElement.flatToGrid());
        }, []);
    }

    createLayer() {
        let layer = new Layer(this._gardenElementFactory, this._boundaries);
        this.layers.push(layer);

        return layer;
    }

    getObjectsAt(position) {
        return this.layers.map((currentLayer) => {
            return currentLayer.getObjectAt(position);
        });
    }

    getGardenerAt(position) {
        if(this._boundaries.isOut(position)) {
            return this._gardenElementFactory.createUnboundElement().gardener;
        }

        let elements = this.layers.map((currentLayer) => {
            let element = currentLayer.getElementAt(position);

            return typeof element !== 'undefined' ? element.gardener : element;
        });

        if(this.allIsUndefined(elements)) {
            return this._gardenElementFactory.createNoElement().gardener;
        }

        let usedElement = elements.filter((element) => {
           return typeof element !== 'undefined'
        });

        if(usedElement.length > 1) {
            throw new Error('Cas non géré, il ne peut y avoir qu\'un seul jardinier par position pour l\'instant');
        }

        return usedElement[0];

    }

    allIsUndefined(points) {
        return points.every((element) => {
           return typeof element === 'undefined';
        });
    }



}