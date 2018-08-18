/// <reference types="mocha" />
import * as assert from 'assert';
import * as lib from './index';
import { Nothing } from 'nothing-mock';

global['jest'] = { // eslint-disable-line tslint/config
    fn: Nothing
};

it('smoke', () => {
    assert(lib.createSpyObj);
});

it('general', () => {
    const spy = lib.createSpyObj('tape', ['play', 'pause']);
    assert(spy.play);
    assert(spy.pause);
});

it('spy deep prototype', () => {
    class Animal {
        sound() { }
    }
    class Cat extends Animal {
        meow() { }
    }
    class Fluffy extends Cat {
        constructor(public breed) { super(); }
        eat() { }
    }
    const spy = lib.createSpyObj(Fluffy);
    assert(spy.eat);
    assert(spy.meow);
    assert(spy.sound);
});

it('function constructor', () => {
    function Cat() {
    }
    Cat.prototype.meow = function() { };
    const spy = lib.createSpyObj<any>(Cat);
    assert(spy.meow);
});

it('object with null prototype', () => {
    function Empty() { }
    Empty.prototype = null;
    const spy = lib.createSpyObj<any>(Empty);
});
