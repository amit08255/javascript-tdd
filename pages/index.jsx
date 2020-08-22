import React from 'react';
import { createStoreon } from 'storeon';
import { storeonLogger } from 'storeon/devtools';
import { useStoreon, StoreContext } from 'storeon/react';

// Initial state, reducers and business logic are packed in independent modules
const homepage = (store) => {
    // Initial state
    store.on('@init', () => ({ username: '', password: '' }));
    // Reducers returns only changed part of the state
    store.on('username', (state, e) => ({
        username: e.target.value,
    }));

    store.on('password', (state, e) => ({
        password: e.target.value,
    }));
};

const store = createStoreon([homepage]);

const Container = () => {
    // Counter will be re-render only on `state.username` changes
    const { dispatch, username, password } = useStoreon(['username', 'password', storeonLogger(store)]);

    return (
        <div>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => dispatch('username', e)}
            />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => dispatch('password', e)}
            />
        </div>
    );
};

const Homepage = () => (
    <StoreContext.Provider value={store}>
        <Container />
    </StoreContext.Provider>
);

export default Homepage;
