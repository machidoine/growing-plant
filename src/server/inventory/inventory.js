/**
 * Created by bguilloteau on 03/11/16.
 */


let Seed = require('./seed');

module.exports = class Inventory {
    constructor(stock) {
        this._stockById = {};

        for(let seed of stock) {
            this._stockById[seed.id] = seed;
        }

    }

    useSeeds(seedIds, callback) {
        let seeds = this.getAllSeed(seedIds);
        if(seeds.length != seedIds.length) {
            return;
        }

        if(callback(seeds)) {
            this.removeAll(seedIds);
        }
    }

    provide(seedId, useItCallback) {
        if(this.contain(seedId)) {
            if(useItCallback(this._stockById[seedId])) {
                this.remove(seedId);
            }
        }
    }



    add(seed) {
        let seedWithId = Seed.create(seed);
        this._stockById[seedWithId.id] = seedWithId;

        return true;
    }

    addAll(seeds) {
        seeds.forEach((seed) => {
            this.add(seed);
        })
    }


    remove(seedIds) {
        delete this._stockById[seedIds];
    }

    removeAll(seedIds) {
        for(let seedId of seedIds) {
            this.remove(seedId);
        }
    }

    containAll(seedIds) {
        for(let seedId in seedIds) {
            if(typeof this._stockById[seedIds] === 'undefined') {
                return false;
            }
        }

        return true;
    }

    getAllSeed(seedIds) {
        let seedWithUndefined = seedIds.map((seedId) => {
            return this._stockById[seedId];
        });

        return seedWithUndefined.filter((e) => {return typeof e !== 'undefined'}); // return all not undefined seed
    }

    contain(seedId) {
        return typeof this._stockById[seedId] !== 'undefined';
    }

    get stock() {
        return Object.keys(this._stockById).map(key => this._stockById[key]);
    }

    static create() {
        return new Inventory([
            Seed.attack(),
            Seed.defense(),
            Seed.growth(),
            Seed.fertility(),
            Seed.victory()
        ]);
    }
}