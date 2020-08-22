import { createStoreon } from 'storeon';
// Initial state, reducers and business logic are packed in independent modules
const homepage = (store) => {
    // Initial state
    store.on('@init', () => ({ username: '', password: '' }));
    // Reducers returns only changed part of the state
    store.on('username', (state, value) => ({
        username: value,
    }));

    store.on('password', (state, value) => ({
        password: value,
    }));
};

const store = createStoreon([homepage]);

export default store;
