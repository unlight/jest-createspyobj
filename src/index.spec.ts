import expect from 'expect';
import { Nothing } from 'nothing-mock';

import { createSpyObject } from '.';

// @ts-ignore
global['jest'] = {
    fn: Nothing,
};

it('smoke', () => {
    expect(typeof createSpyObject).toBe('function');
});

it('general', () => {
    const spy = createSpyObject('tape', ['play', 'pause']);
    expect(spy.play).toBeTruthy();
    expect(spy.pause).toBeTruthy();
});

it('spy deep prototype', () => {
    class Animal {
        sound() {}
    }
    class Cat extends Animal {
        meow() {}
    }
    class Fluffy extends Cat {
        constructor(public breed: any) {
            super();
        }
        eat() {}
    }
    const spy = createSpyObject(Fluffy);
    expect(spy.eat).toBeTruthy();
    expect(spy.meow).toBeTruthy();
    expect(spy.sound).toBeTruthy();
});

it('function constructor', () => {
    function Cat() {}
    Cat.prototype.meow = function () {};
    const spy = createSpyObject<any>(Cat);
    expect(spy.meow).toBeTruthy();
});

it('object with null prototype', () => {
    function Empty() {}
    Empty.prototype = null;
    const spy = createSpyObject(Empty);
    expect(spy).toBeTruthy();
});
