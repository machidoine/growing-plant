'use strict'

var GardenElement = require('./garden-element');
var utils = require("./../../utils/utils.js");
var constants = require('./../../utils/constants');

module.exports = class Plant extends GardenElement {
    constructor(garden, seed) {
        super(seed);

        this._seed = seed;
        this.body = [];
        this.garden = garden;
        this.lastBody = this.seed;
        this._direction = seed.direction;
    }

    nextPosition() {
        return this.translate(this.lastBody.position, this._direction);
    }

    grow() {
        var newBody = utils.clone(this.lastBody);
        newBody.previousDirection = this.lastBody.direction;
        newBody.type = "plant-body";

        newBody.position = this.nextPosition();
        newBody.direction = this._direction;

        this.garden.addBody(newBody, this);
        this.body.push(newBody);
        if (this.lastBody.type !== 'seed') {
            this.lastBody.type = 'plant-body';
        }
        newBody.type = 'plant-head';
        this.lastBody = newBody;
    }

    translate(position, direction) {
        var d = constants.directions[direction];
        return {
            x : position.x + d.x,
            y: position.y + d.y,
        };
    }

    get bodies() {
        return this.body;
    }

    get seed() {
        return this._seed;
    }

    set direction(direction) {
        this._direction = direction;
        this.lastBody.direction = direction;
    }

    get direction() {
        return this._direction;
    }
};


