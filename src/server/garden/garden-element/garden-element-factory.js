'use strict'

let Plant = require('./plant');
let Body = require('./body');
let UnboundGardenElement = require('./unbound-garden-element');
let NoElementGardenElement = require('./noelement-garden-element');

let PlantGardener = require('./../gardener/plant-gardener');
let BodyGardener = require('./../gardener/body-gardener');

let UnboundGardener = require('./../gardener/unbound-gardener');
let NoElementGardener = require('./../gardener/noelement-gardener');

module.exports = class GardenElementFactory {
    constructor(garden) {
        this._garden = garden;
    }

    createPlant(seed) {
        let plant = new Plant(this._garden, seed);
        plant.gardener = new PlantGardener(this._garden, plant);

        return plant;
    }
    createPlantBody(bodyParameter, plant) {
        let body = new Body(bodyParameter, plant);
        body.gardener = new BodyGardener(this._garden, body);

        return body;
    }

    createUnboundElement() {
        let unbound = new UnboundGardenElement();
        unbound.gardener = new UnboundGardener(this._garden);

        return unbound;
    }

    createNoElement() {
        let noElement = new NoElementGardenElement();
        noElement.gardener = new NoElementGardener(this._garden);

        return noElement;
    }

}
