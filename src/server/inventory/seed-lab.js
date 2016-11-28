/**
 * Created by bguilloteau on 21/11/16.
 */

'use strict'

module.exports = class SeedLab {
    constructor() {
    }

    combineSeeds(seeds, callback) {
       return this.combineSeedSkills(seeds.map((seed) => { return seed.skills}), (combinedSkills) => {
            return callback({skills: combinedSkills});
        });
    }

    combineSeedSkills(seedsSkills, callback) {
        return callback(seedsSkills.reduce((acc, next) => {
            for (let property in next){
                if(typeof acc[property] === 'undefined'){
                    acc[property] = next[property];
                }
                else{
                    acc[property] += next[property];
                }
            }

            return acc;
        }, {}));
    }
}
