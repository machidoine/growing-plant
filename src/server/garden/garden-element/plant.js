'use strict'

var GardenElement = require('./garden-element');
var utils = require("./../../utils/utils.js");
var constants = require('./../../utils/constants');

module.exports = class Plant extends GardenElement {
    constructor(garden, seed) {
        super(seed);

        this.seed = seed;
        this.body = [];
        this.garden = garden;
        this.lastBody = this.seed;
        this.direction = seed.direction;
    }

    nextPosition() {
        return this.translate(this.lastBody.position, this.direction);
    }

    grow() {
        var newBody = utils.clone(this.lastBody);
        newBody.type = "plant-body";

        newBody.position = this.nextPosition();
        newBody.direction = this.direction;

        this.garden.addBody(newBody);
        this.body.push(newBody);
        if (this.lastBody.type !== 'seed') {
            this.lastBody.type = 'plant-body';
        }
        newBody.type = 'plant-head';
        this.lastBody = newBody;

        return; // TODO next code must be removed when we are sure ok our gardener

        if (this.garden.allowAddHere(newBody.position)) {
            console.log('can grow and grow');
            var direction = this.garden.consumeStem(newBody);
            console.log(constants.directions[direction]);
            console.log(constants.directions[this.direction]);
            if (!(constants.directions[direction].x + constants.directions[this.direction].x === 0 && constants.directions[direction].y + constants.directions[this.direction].y === 0)) {
                newBody.direction = direction;
                this.direction = direction;
            }

            this.garden.addBody(newBody);
            this.body.push(newBody);
            if (this.lastBody.type !== 'seed') {
                this.lastBody.type = 'plant-body';
            }
            newBody.type = 'plant-head';
            this.lastBody = newBody;
        } else {
            this.garden.replaceByMoldIfOut(this, newBody);
        }
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
};


