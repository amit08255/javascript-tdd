import { createStoreon } from 'storeon';
import homepage from './homepage';

describe('homepage store test', () => {
    test('username, password and userKey events work correctly', () => {
        const store = createStoreon([homepage]);

        store.dispatch('username', 'amit');
        store.dispatch('password', 'pass');
        store.dispatch('userkey', 'user');

        expect(store.get().username).toBe('amit');
        expect(store.get().password).toBe('pass');
        expect(store.get().userKey).toBe('user');
    });

    test('get/userkey event works correctly', async () => {
        const store = createStoreon([homepage]);

        const userKey = '85b84a76089174eca3eae09a46e54c30';

        const promise = new Promise((resolve) => {
            resolve(userKey);
        });

        await store.dispatch('get/userkey', promise);
        expect(store.get().userKey).toBe(userKey);
    });
});
