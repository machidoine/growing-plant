"use strict";
/**
 * Created by bguilloteau on 22/09/16.
 */

var should = require('should');
var NoElementGardener = require('../../src/server/garden/gardener/noelement-gardener');

describe('gardener test', function () {
    var gardener;
    describe('with a no element gardener', function () {
        beforeEach(function () {
            gardener = new NoElementGardener(null, null);
        });

        describe('#workOnPlant()', function () {
            it('grow the plant with a correct plant', function (done) {
                gardener.workOnPlant({
                    grow : function() {
                        done();
                    }
                });
            })

            it('throw exception when the given plant is null', function () {
                gardener.workOnPlant.bind(null).should.throw('plant must be provided to grow');
            })
        })

        describe('#plant()', function () {
            it('plant a seed to the garden');
        })
    })
});