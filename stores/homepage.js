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

    store.on('get/userkey', async (state, promise) => {
        try {
            const response = await promise;
            store.dispatch('userkey', response);
        } catch (e) {
            store.dispatch('errors/server-error');
        }
    });
};

export default homepage;
