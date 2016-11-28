'use strict'

/**
 * Created by bguilloteau on 21/11/16.
 */

var should = require('should');
var ReflectionUtil = require('../../src/server/utils/reflection-util');


describe('reflection util tests', function () {

    it('should shift string', () => {
       "onEvent".substring(2).toLowerCase(0).should.eql("event");
    });
});

describe('reflection util tests', function () {

    it('empty tableau', () => {

        ReflectionUtil.listFunctionStartedBy(new class {}, 'on').should.eql([]);
    });

    it('with function no started by on', () => {
        ReflectionUtil.listFunctionStartedBy({
            'f': () => {
            }
        }, 'on').should.eql([]);
    });

    it('with property started by on, no function', () => {
        ReflectionUtil.listFunctionStartedBy(new class {constructor() {this.onEvent = 0}}, 'on').should.eql([]);
    });

    it('with one correct function', () => {
        class A {
            onEvent(){

            }
        }

        ReflectionUtil.listFunctionStartedBy( new A(), 'on').should.eql(['onEvent']);
    });

    it('with one correct function and a no on function', () => {
        ReflectionUtil.listFunctionStartedBy(new class {
            onEvent() {
            }
            f() {
            }
        }, 'on').should.eql(['onEvent']);
    });

    it('with two correct function and a no on function', () => {
        ReflectionUtil.listFunctionStartedBy(new class {
            onEvent() {
            }
            onEvent2() {
            }
        }, 'on').should.eql(['onEvent', 'onEvent2']);
    });

    it('with two correct function and two no on function', () => {
        ReflectionUtil.listFunctionStartedBy(new class {

            onEvent() {
            }
            onEvent2() {
            }
            f1() {
            }
            f2() {
            }
        }, 'on').should.eql(['onEvent', 'onEvent2']);
    });

    it('with big obejct', () => {
        ReflectionUtil.listFunctionStartedBy(new class {
            constructor() {
                this.onProp = 0;
                this.prop = 1;
            }
            onEvent() {
            }
            onEvent2() {
            }
            f1() {
            }
            f2() {
            }

        }, 'on').should.eql(['onEvent', 'onEvent2']);
    });

});