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
        console.log('tick', plant.tick);
        let isTickOK = (plant.tick * config.game.world.refreshTime) % config.game.world.dayTime === 0;
        console.log(isTickOK);
        console.log('dayGTime/1000', config.game.world.dayTime / 1000);
        if (isTickOK && age % (maxGrowth - growth) === 0 && growth != 0) {
            console.log('grow !', plant.age);
            callback();
        }
    }

    static collectSeed(plant, callback) {
        let totalSkillsPower = Object.keys(plant.seed.skills).reduce((current, next) => {
            return current + plant.seed.skills[next];
        }, 0);

        let min = config.game.garden.plant.collected.minAgeToBeCollected;
        let skillCoeff = config.game.garden.plant.collected.skillCoeffToBeCollected;

        let result = (plant.age % (min + (totalSkillsPower * skillCoeff)));

        if (plant.tick % (config.game.world.dayTime / 1000) === 0 && result === 0) {
            console.log('collect !', plant.age);
            callback();
        }
    }

}
