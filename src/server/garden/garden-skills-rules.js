'use strict'

let config = require('../config');

/**
 * Created by bguilloteau on 29/11/16.
 */

module.exports = class GardenSkillsRules {
    constructor() {
    }

    static growAged(plant, callback) {
        let growth = plant.seed.skills.growth || 0;
        let age = plant.age;
        let maxGrowth = config.game.garden.plant.maxGrowth;
        let isTickOK = (plant.tick * config.game.world.refreshTime) % config.game.world.dayTime === 0;
        if (isTickOK && age % (maxGrowth - growth) === 0 && growth != 0) {
            callback();
        }
    }

    static collectSeed(plant, callback) {
        let totalSkillsPower = Object.keys(plant.seed.skills).reduce((current, next) => {
            return current + plant.seed.skills[next];
        }, 0);

        let min = config.game.garden.plant.collected.minAgeToBeCollected;
        let skillCoeff = config.game.garden.plant.collected.skillCoeffToBeCollected;

        let result = plant.age != 0 && (plant.age % (min + (totalSkillsPower * skillCoeff)));

        if (plant.tick % (config.game.world.dayTime / config.game.world.refreshTime) === 0 && result === 0) {
            callback();
        }
    }

}
