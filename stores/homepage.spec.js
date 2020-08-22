import store from './homepage';

describe('homepage store test', () => {
    test('username and password events work correctly', () => {
        store.dispatch('username', 'amit');
        store.dispatch('password', 'pass');

        expect(store.get().username).toBe('amit');
        expect(store.get().password).toBe('pass');
    });
});
