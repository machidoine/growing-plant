/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

let GardenBoundaries = require('./boundaries');
let Grid = require('./../layer/grid');

let GardenElementFactory = require('./garden-element/garden-element-factory');
let utils = require("./../utils/utils.js");

let LayerContainer = require("./../layer/layer-container");

module.exports = class Garden {
    constructor(plantGrid) {
        this.width = plantGrid.width;
        this.height = plantGrid.height;
        this.boundaries = new GardenBoundaries(this);
        this._plants = [];

        this._gardenElementFactory = new GardenElementFactory(this);
        this._layerContainer = new LayerContainer(this._gardenElementFactory, this.boundaries);
        this._plantLayer = this._layerContainer.createLayer();

        this.newSeedEventHandler = {};
        this.collectedSeedByTeam = {};
    }

    changeToNextDay() {
        this._plants.forEach((plant) => {
            plant.makeOlder();

            let position = plant.nextPosition();
            let multiLayerGardeners = this._layerContainer.getGardenerAt(position);
            multiLayerGardeners.workOnPlant(plant); // TODO handle multiple element on same position in different layer

            this.collectSeeds(plant);
        })

        this.dispatchSeedCollected();
    }

    collectSeeds(plant) {
       plant.collectSeed((seed, team) => {
            if(typeof this.collectedSeedByTeam[team] === 'undefined') {
                this.collectedSeedByTeam[team] = [];
            }
            this.collectedSeedByTeam[team].push(seed);
        });
    }

    dispatchSeedCollected() {
        Object.keys(this.collectedSeedByTeam).forEach((team) => {
            this.newSeedEventHandler[team](this.collectedSeedByTeam[team]);
            this.collectedSeedByTeam[team] = [];
        })
    }

    getRawGrid() {
        return this._layerContainer.flatToGrid();
    }


    get gardenElementFactory() {
        return this._gardenElementFactory;
    }

    addSeed(seed) {
        let gardeners = this._layerContainer.getGardenerAt(seed.position);
        gardeners.plant(seed);

        return true;
    }

    removePlant(seedId) {
        let plant = this.getPlantById(seedId);
        this.removeAllPlantElement(plant);
    }

    changePlantDirection(seedId, direction) {
        let plant = this.getPlantById(seedId);
        plant.direction = direction;
    }


    removeAllPlantElement(plant) {
        plant.bodies.forEach((body) => {
            this._plantLayer.removeElement(body);
        });
        this._plantLayer.removeElement(plant.seed);
        this._plants.splice(this._plants.indexOf(plant), 1);
    }

    getPlantById(seedId) {
        return this.plants.find((plant) => {
            return plant.seed.id === seedId;
        })
    }

    addBody(body, plant) {
        this._plantLayer.addElement(this._gardenElementFactory.createPlantBody(body, plant));
    }

    addNewSeedPresentForTeam(team, handler) {
        this.newSeedEventHandler[team] = handler;
    }

    get plants() {
        return this._plants;
    }

    get layerContainer() {
        return this._layerContainer;
    }

    get plantLayer() {
        return this._plantLayer;
    }



};
