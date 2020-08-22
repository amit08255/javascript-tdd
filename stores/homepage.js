import { createStoreon } from 'storeon';
import { getApiUserKey } from 'services/api';
// Initial state, reducers and business logic are packed in independent modules
const homepage = (store) => {
    // Initial state
    store.on('@init', () => ({ username: '', password: '', userKey: '' }));
    // Reducers returns only changed part of the state
    store.on('username', (state, value) => ({
        username: value,
    }));

    store.on('password', (state, value) => ({
        password: value,
    }));

    store.on('userkey', (state, value) => ({
        userKey: value,
    }));

    store.on('get/userkey', async (state, devKey) => {
        try {
            const data = {
                username: state.username,
                password: state.password,
                devKey,
            };

            const response = await getApiUserKey(data);
            store.dispatch('userkey', response.data);
        } catch (e) {
            store.dispatch('errors/server-error');
        }
    });
};

const store = createStoreon([homepage]);

export default store;
