'use strict'

var Plant = require('./plant');
var Body = require('./body');
var UnboundGardenElement = require('./unbound-garden-element');
var NoElementGardenElement = require('./noelement-garden-element');

var PlantGardener = require('./../gardener/plant-gardener');
var BodyGardener = require('./../gardener/body-gardener');

var UnboundGardener = require('./../gardener/unbound-gardener');
var NoElementGardener = require('./../gardener/noelement-gardener');

module.exports = class GardenElementFactory {
    constructor(garden) {
        this._garden = garden;
    }

    createPlant(seed) {
        var plant = new Plant(this._garden, seed);
        plant.gardener = new PlantGardener(this._garden, plant);

        return plant;
    }
    createPlantBody(bodyParameter, plant) {
        var body = new Body(bodyParameter, plant);
        body.gardener = new BodyGardener(this._garden, body);

        return body;
    }

    createUnboundElement() {
        var unbound = new UnboundGardenElement();
        unbound.gardener = new UnboundGardener(this._garden);

        return unbound;
    }

    createNoElement() {
        var noElement = new NoElementGardenElement();
        noElement.gardener = new NoElementGardener(this._garden);

        return noElement;
    }

}
