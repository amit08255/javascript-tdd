import React from 'react';
import store from 'stores/homepage';
import { storeonLogger } from 'storeon/devtools';
import { useStoreon, StoreContext } from 'storeon/react';

const Container = () => {
    const devKey = 'HF7L8scxdRXF76KYrtoDyrQCOVoVwqR_';

    // Counter will be re-render only on `state.username` changes
    const { dispatch, username, password } = useStoreon([
        'username', 'password', 'get/userkey', storeonLogger(store),
    ]);

    return (
        <div>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => dispatch('username', e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => dispatch('password', e.target.value)}
            />

            <button onClick={() => dispatch('get/userkey', devKey)} type="button">Submit</button>
        </div>
    );
};

const Homepage = () => (
    <StoreContext.Provider value={store}>
        <Container />
    </StoreContext.Provider>
);

export default Homepage;
