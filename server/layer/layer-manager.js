/**
 * Created by benjamin on 7/29/2016.
 */
'use strict'

module.exports = class LayerManager {
    constructor() {
        this.layers = [];
    }

    createLayer() {
        var layer = new Layer();
        layers.push(layer);

        return layer;
    }

    addPlant(layer) {
        this.plantLayer.addElement();
    }

    addStem(layer) {
        this.stemLayer.push(layer);
    }

    addMold(layer) {
        this.moldLayer.push(layer);
    }
}