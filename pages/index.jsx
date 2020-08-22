import React from 'react';
import store from 'stores/homepage';
import { storeonLogger } from 'storeon/devtools';
import { useStoreon, StoreContext } from 'storeon/react';

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
