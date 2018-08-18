type Constructor<T> = { new(...args: any[]): T } | ((...args: any[]) => T) | Function; // eslint-disable-line tslint/config

export function createSpyObj(ref: string, methods: PropertyKey[]): jest.Mocked<any>;
export function createSpyObj<T>(ref: Constructor<T>, methods?: PropertyKey[]): jest.Mocked<T>;

export function createSpyObj(ref: any, methods?: PropertyKey[]) {
    let name = ref;
    if (typeof ref === 'function') {
        name = ref.name || 'createSpyObj';
        if (!methods) {
            methods = [];
            let t: Constructor<any> = ref;
            while ((t.prototype && typeof t.prototype === 'object') && !(t == null || t === Object)) {
                methods.push(...getClassMethods(t));
                ({ constructor: t } = Object.getPrototypeOf(t.prototype));
            }
        }
    }
    return methods.reduce((object, key) => {
        object[key] = jest.fn().mockName(`${name}.${key}`);
        return object;
    }, {});
}

function getClassMethods(target: Constructor<any>) {
    let keys: PropertyKey[];
    if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
        keys = Reflect.ownKeys(target.prototype);
    } else {
        keys = Object.getOwnPropertyNames(target.prototype);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
        }
    }
    return keys.filter(key => {
        if (key === 'constructor') {
            return false;
        }
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
        if (typeof descriptor.value === 'function') {
            return true;
        }
        return false;
    });
}
