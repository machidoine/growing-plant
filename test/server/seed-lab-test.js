'use strict'

/**
 * Created by bguilloteau on 21/11/16.
 */

var should = require('should');
var SeedLab = require('../../src/server/inventory/seed-lab');
var Seed = require('../../src/server/inventory/seed');


let removeId = (e) => {
    delete e.id;
    return e;
}

describe('seed lab test', function () {
    var seedLab = new SeedLab();

    it('test simple tableau', () => {
        removeId({a: 3, id: 5}).should.eql({a: 3});
    });

    it('empty', (done) => {
        seedLab.combineSeedSkills([], (result) => {
            result.should.be.empty();
            done();
        })
    });

    it('with one empty seed should return one seed with ID', (done) => {
        seedLab.combineSeedSkills([{}], (result) => {
            removeId(result).should.containEql({});
            done();
        })
    });

    it('with one seed should return one seed with ID', (done) => {
        seedLab.combineSeedSkills([Seed.attack().skills], (result) => {
            removeId(result).should.containEql({'attack':1});
            done();
        })
    });

    it('with 2 seeds with different property should add property', (done) => {
        check([{'a':1}, {'b':1}], {'a': 1, 'b':1});
        done();
    });

    it('with 2 seeds with different property', (done) => {
        check([{'a':1, 'b':1}, {'b':1}], {'a': 1, 'b':2});
        done();
    });

    it('with 2 seeds with inverse property', (done) => {
        check([{'a':1}, {'b':1, 'a':1}], {'a': 2, 'b':1});
        done();
    });

    it('with 2 seeds with inverse property', (done) => {
        check([{'a':1, 'c':1}, {'b':1, 'a':1}], {'a': 2, 'b':1, 'c':1});
        done();
    });

    it('with 3 seeds with inverse property', (done) => {
        check([{'a':1, 'c':1}, {'b':1, 'a':1}, {'a':1, 'b':1, 'c':1, 'd':1}], {'a': 3, 'b':2, 'c':2, 'd':1});
        done();
    });

    let check = (array, result) => {
        seedLab.combineSeedSkills(array, (result) => {
            removeId(result).should.eql(result);
        })
    }

});