"use strict";
/**
 * Created by bguilloteau on 22/09/16.
 */

var should = require('should');
var Inventory = require('../../src/server/inventory/inventory');
var Seed = require('../../src/server/inventory/seed');

let removeId = (e) => {
    delete e.id;
    return e;
}


describe('with Inventory', function () {
    var inventory;
    describe('with a no element gardener', function () {
        beforeEach(function () {
           inventory = Inventory.create();
        });

        describe('#provide()', function () {
            it('provide a seed if it exists', (done) => {
                testProvide(1, Seed.defense(), done);
                inventory.provide(1, (seed) => {
                    "".should.eql("a");
                });
            })

            let testProvide = (seedId, expected, done) => {
                inventory.provide(seedId, (seed) => {
                    let expectedWithoutId = removeId(expected);
                    removeId(seed).should.eql(expectedWithoutId);
                    return true;
                });
            }

            it('throw exception when the given plant is null', function () {
                console.log(Object.keys({1:['a', 'b'], 2:['c', 'd']}));
            })
        })

        describe('#plant()', function () {
            it('plant a seed to the garden');
        })
    })
});