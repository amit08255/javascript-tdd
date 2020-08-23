import React from 'react';
import homepage from 'stores/homepage';
import { createStoreon } from 'storeon';
import { storeonLogger } from 'storeon/devtools';
import { useStoreon, StoreContext } from 'storeon/react';
import { getApiUserKey } from 'services/api';
import Login from 'components/login';

const store = createStoreon([homepage]);

const Container = () => {
    const devKey = 'HF7L8scxdRXF76KYrtoDyrQCOVoVwqR_';

    // Counter will be re-render only on `state.username` changes
    const { dispatch, username, password } = useStoreon([
        'username', 'password', 'get/userkey', storeonLogger(store),
    ]);

    const onSubmitClick = () => {
        const data = {
            username: store.get().username,
            password: store.get().password,
            devKey,
        };

        const promise = getApiUserKey(data).then((r) => r.data);
        dispatch('get/userkey', promise);
    };

    return (
        <Login
            username={username}
            password={password}
            onUsernameChange={(e) => dispatch('username', e.target.value)}
            onPasswordChange={(e) => dispatch('password', e.target.value)}
            onSubmit={onSubmitClick}
        />
    );
};

const Homepage = () => (
    <StoreContext.Provider value={store}>
        <Container />
    </StoreContext.Provider>
);

export default Homepage;
