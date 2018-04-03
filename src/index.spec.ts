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

it.skip('typings', () => {
    class Cat {
        eat() { 'eat'; }
    }
    const spy = lib.createSpyObj(Cat, []);
    assert(spy.eat);
});
