/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

var GardenBoundaries = require('./boundaries');
var Grid = require('./../layer/grid');

var GardenElementFactory = require('./garden-element/garden-element-factory');
var utils = require("./../utils/utils.js");
var GardenGridConvertor = require('./garden-grid-convertor');

var LayerContainer = require("./../layer/layer-container");

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


        this._gardenElementFactory = new GardenElementFactory(this);
        this._layerContainer = new LayerContainer(this._gardenElementFactory, this.boundaries);
        this._plantLayer = this._layerContainer.createLayer();
        this._moldLayer = this._layerContainer.createLayer();
        this._stemLayer = this._layerContainer.createLayer();


    }

    get gardenElementFactory() {
        return this._gardenElementFactory;
    }

    addSeed(seed) {
        var gardeners = this._layerContainer.getGardenerAt(seed.position);
        gardeners.plant(seed);
    }

    addStem(stem) {
        if (this.allowAddHere(stem.position)) {
            this._stemLayer.addElement(this._gardenElementFactory.createStem(stem));
        }
    }

    addBody(body) {
        this._plantLayer.addElement(this._gardenElementFactory.createPlantBody(body));
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

    get layerContainer() {
        return this._layerContainer;
    }

    get stemLayer() {
        return this._stemLayer;
    }

    get plantLayer() {
        return this._plantLayer;
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
        return this._layerContainer.flatToGrid();
    }
    
    changeToNextDay() {
        this._plants.forEach((plant) => {
            var position = plant.nextPosition();
            var multiLayerGardeners = this._layerContainer.getGardenerAt(position);
            console.log(multiLayerGardeners);
            console.log('------------------------------------------------------------------');
            multiLayerGardeners.workOnPlant(plant); // TODO handle multiple element on same position in different layer
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
