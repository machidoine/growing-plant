'use strict'

var utils = require("./utils.js");
var constants = require('./constants');
/**
 * Created by benjamin on 7/28/2016.
 */


module.exports = class Plant {
    constructor(garden, seed) {
        this.seed = seed;
        this.body = [];
        this.garden = garden;
        this.lastBody = this.seed;
        this.direction = seed.direction;
    }

    grow() {
        var newBody = utils.clone(this.lastBody);
        newBody.type = "plant-body";

        newBody.position = this.translate(newBody.position, this.direction);

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
        position.x += d.x;
        position.y += d.y;
        return position;
    }

    get bodies() {
        return this.body;
    }
};


