/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

var GardenBoundaries = require('./garden-boundaries');
var Grid = require('./grid');
var Plant = require('./plant');
var utils = require("./utils.js");
var GardenGridConvertor = require('./garden-grid-convertor');

var LayerManager = require("./layer/layer-manager");

module.exports = class Garden {
    constructor(plantGrid) {
        this.width = plantGrid.width;
        this.height = plantGrid.height;
        this.boundaries = new GardenBoundaries(this);
        this._plantGrid = plantGrid;
        this._plants = [];
        this._stems = [];
        this._stemGrid = new Grid(this.width, this.height);
        this._molds = [];
        this._moldGrid = new Grid(this.width, this.height);
        
        this.layerManager = new LayerManager();
        this.plantLayer = this.layerManager.createLayer();
        this.layerManager.addLayer(new MoldLayer());
        this.layerManager.addLayer(new StemLayer());        
    }

    addSeed(seed) {
        if (this.allowAddHere(seed.position)) {
            console.log('addSeed');
            var start = new Date().getTime();

            this._plantGrid.addPoint(seed);

            this._plants.push(new Plant(this, seed));
            // or ?
            // this._plants[this.getIndex(seed.position)] = new Plant(this, seed);

            var end = new Date().getTime();
            var elapse = end - start;
            console.log('push plant : ' + elapse);
        }
    }

    addStem(stem) {
        if (this.allowAddHere(stem.position)) {
            this._stemGrid.addPoint(stem);
        }
    }

    addBody(body) {
        this._plantGrid.addPoint(body);
    }

    getIndex(position) {
        return position.y * this.width + position.x;
    }

    get plants() {
        return this._plants;
    }

    consumeStem(element) {
        var stem = this._stemGrid.getPoint(element.position);

        if (typeof stem !== 'undefined' && stem.team === element.team) {
            this._stemGrid.removePoint(stem);
            return stem.direction;
        }

        return element.direction;
    }

    get plantGrid() {
        return this._plantGrid;
    }

    get stemGrid() {
        return this._stemGrid;
    }

    get moldGrid() {
        return this._moldGrid;
    }

    allowAddHere(point) {
        return typeof this._plantGrid.getPoint(point) === 'undefined' && this.boundaries.isIn(point);
    }

    replaceByMoldIfOut(plant, newBody) {
        if (this.boundaries.isOut(newBody.position)) {
            this.replaceByMold(plant);
        }
    }

    replaceByMold(plant) {
        var me = this;
        plant.bodies.forEach(function (body) {
            var mold = utils.clone(body);
            mold.type = 'mold';
            me._molds.push(mold);
            me._moldGrid.addPoint(mold);

            me._plantGrid.removePoint(body);
        });

        this._plants.splice(this._plants.indexOf(plant), 1);
        this._plantGrid.removePoint(plant.seed);
    }

    getRawGrid() {
        return GardenGridConvertor.toGrid(this);
    }
    
    grow() {
        this._plants.forEach(function (plant) {
            plant.grow();
        })
    }

    addElement(element) {
        if (element.type === 'seed') {
            this.addSeed(element);
        } else if (element.type === 'stem') {
            this.addStem(element);
        }
    }
};
