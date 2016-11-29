'use strict'
let winston = require('winston');

let GardenElement = require('./garden-element');
let utils = require("./../../utils/utils.js");
let constants = require('./../../utils/constants');
let config = require('../../config')

module.exports = class Plant extends GardenElement {
    constructor(garden, seed) {
        super(seed);

        this._seed = seed;
        this.body = [];
        this.garden = garden;
        this.lastBody = this.seed;
        this._direction = seed.direction;

        this._age = 0;
    }

    nextPosition() {
        return this.translate(this.lastBody.position, this._direction);
    }

    grow() {
        let newBody = utils.clone(this.lastBody);
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
        let d = constants.directions[direction];
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

    makeOlder() {
        this._age++;
    }

    collectSeed(callback) {
        let totalSkillsPower = Object.keys(this._seed.skills).reduce((current, next) => {
            return current + this._seed.skills[next];
        }, 0);


        winston.debug('totalSkillPower : ', totalSkillsPower);

        let min = config.game.garden.plant.seed.minTimeToBeCollected;
        let skillCoeff = config.game.garden.plant.seed.skillCoeffToBeCollected;

        winston.debug("result : ", (this._age++ % (min + (totalSkillsPower * skillCoeff))));

        if((this._age++ % (min + (totalSkillsPower * skillCoeff))) === 0) {
            let seed = {skills : utils.clone(this._seed.skills)};
            winston.debug('generated seed : ', seed)
            callback(seed, this._seed.team);
        }
    }
};
