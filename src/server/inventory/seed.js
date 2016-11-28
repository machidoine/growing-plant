/**
 * Created by bguilloteau on 21/11/16.
 */

'use strict'

let IdGenerator = require('./id-generator')

module.exports = class Seed {
    constructor() {
    }

    static create(seedProperties) {
        seedProperties.id = IdGenerator.generate();

        return seedProperties;
    }

    static attack() {
        return this.create({
            skills : {
                'attack' : 1
            }
        });
    }

    static defense() {
        return this.create({
            skills : {
                'defense' : 1
            }
        });
    }

    static growth() {
        return this.create({
            skills : {
                'growth' : 1
            }
        });
    }

    static fertility() {
        return this.create({
            skills : {
                'fertility' : 1
            }
        });
    }

    static victory() {
        return this.create({
            skills : {
                'victory' : 1
            }
        });
    }

}
