jest-createspyobj
===
Helper function to create spy object for `jest`, same as `jasmine.createSpyObj`

API
---
```ts
function createSpyObj(ref: string, methods: string[]): jest.Mocked<any>;
function createSpyObj<T>(ref: Constructor<T>, methods: string[]): jest.Mocked<T>;
```

CHANGELOG
---
See [CHANGELOG.md](CHANGELOG.md)
