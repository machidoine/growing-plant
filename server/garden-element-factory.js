'use strict'

var Plant = require('./plant');
var Stem = require('./stem');
var Body = require('./body');
var Mold = require('./mold');
var UnboundGardenElement = require('./unbound-garden-element');
var NoElementGardenElement = require('./noelement-garden-element');

var PlantGardener = require('./plant-gardener');
var StemGardener = require('./stem-gardener');
var BodyGardener = require('./body-gardener');
var MoldGardener = require('./mold-gardener');

var UnboundGardener = require('./unbound-gardener');
var NoElementGardener = require('./noelement-gardener');

module.exports = class GardenElementFactory {
    constructor(garden) {
        this._garden = garden;
    }

    createPlant(seed) {
        var plant = new Plant(this._garden, seed);
        plant.gardener = new PlantGardener(this._garden, plant);

        return plant;
    }

    createStem(stemParameter) {
        var stem = new Stem(stemParameter);
        stem.gardener = new StemGardener(this._garden, stem);

        return stem;
    }

    createPlantBody(bodyParameter) {
        var body = new Body(bodyParameter);
        body.gardener = new BodyGardener(this._garden, body);

        return body;
    }

    createMold(moldParameter) {
        var mold = new Mold(moldParameter);
        mold.gardener = new MoldGardener(this._garden, mold);

        return mold;
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
