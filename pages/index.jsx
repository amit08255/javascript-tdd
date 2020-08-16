import React from 'react';
import PropTypes from 'prop-types';
import {
    compose, withState, withHandlers, withStateHandlers,
} from 'packages/proppy';

import { attach } from 'packages/proppy-react';

const P = compose(
    withState('notesList', 'setNotesList', []),
    withState('isLoading', 'setLoading', false),
    withStateHandlers(
        { username: '' },
        { handleUsername: () => (e) => ({ username: e.target.value }) },
    ),
    withStateHandlers(
        { password: '' },
        { handlePassword: () => (e) => ({ password: e.target.value }) },
    ),
    withHandlers({
        handleFetch: (props) => () => props,
    }),
);

function Homepage({
    username, password, isLoading, handleFetch, handleUsername, handlePassword,
}) {
    if (isLoading === true) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div>
            <input type="text" value={username} onChange={handleUsername} />
            <input type="text" value={password} onChange={handlePassword} />
            <button type="button" onClick={() => handleFetch()}>Submit</button>
        </div>
    );
}

Homepage.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleFetch: PropTypes.func.isRequired,
    handleUsername: PropTypes.func.isRequired,
    handlePassword: PropTypes.func.isRequired,
};

export default attach(P)(Homepage);
