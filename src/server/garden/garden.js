/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

var GardenBoundaries = require('./boundaries');
var Grid = require('./../layer/grid');

var GardenElementFactory = require('./garden-element/garden-element-factory');
var utils = require("./../utils/utils.js");

var LayerContainer = require("./../layer/layer-container");

module.exports = class Garden {
    constructor(plantGrid) {
        this.width = plantGrid.width;
        this.height = plantGrid.height;
        this.boundaries = new GardenBoundaries(this);
        this._plants = [];

        this._gardenElementFactory = new GardenElementFactory(this);
        this._layerContainer = new LayerContainer(this._gardenElementFactory, this.boundaries);
        this._plantLayer = this._layerContainer.createLayer();
        this._moldLayer = this._layerContainer.createLayer();
        this._stemLayer = this._layerContainer.createLayer();
    }

    addElement(element) {
        if (element.type === 'seed') {
            this.addSeed(element);
        } else if (element.type === 'stem') {
            this.addStem(element);
        }
    }

    changeToNextDay() {
        this._plants.forEach((plant) => {
            var position = plant.nextPosition();
            var multiLayerGardeners = this._layerContainer.getGardenerAt(position);
            multiLayerGardeners.workOnPlant(plant); // TODO handle multiple element on same position in different layer
        })
    }

    getRawGrid() {
        return this._layerContainer.flatToGrid();
    }


    get gardenElementFactory() {
        return this._gardenElementFactory;
    }

    addSeed(seed) {
        var gardeners = this._layerContainer.getGardenerAt(seed.position);
        gardeners.plant(seed);
    }

    addStem(stem) {
        var gardeners = this._layerContainer.getGardenerAt(stem.position);
        gardeners.addStem(stem);
    }

    addBody(body, plant) {
        this._plantLayer.addElement(this._gardenElementFactory.createPlantBody(body, plant));
    }

    get plants() {
        return this._plants;
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

    replaceByMold(plant) {
        plant.bodies.forEach((body) => {
            var moldData = utils.clone(body);
            moldData.type = 'mold';
            this._moldLayer.addElement(this._gardenElementFactory.createMold(moldData));
            this._plantLayer.removeElement(body);
        });
        this._plantLayer.removeElement(plant.seed);
        this._plants.splice(this._plants.indexOf(plant), 1);
    }




};
