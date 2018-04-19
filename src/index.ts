type Constructor<T> = { new(...args: any[]): T } | ((...args: any[]) => T) | Function; // eslint-disable-line tslint/config

export function createSpyObj(ref: string, methods: string[]): jest.Mocked<any>;
export function createSpyObj<T>(ref: Constructor<T>, methods: string[]): jest.Mocked<T>;

export function createSpyObj(ref: any, methods: string[]) {
    let name = ref;
    if (typeof ref === 'function') {
        name = ref.name || 'createSpyObj';
    }
    return methods.reduce((object, key) => {
        object[key] = jest.fn().mockName(`${name}.${key}`);
        return object;
    }, {});
}
