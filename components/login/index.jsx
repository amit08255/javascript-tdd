import React from 'react';
import PropTypes from 'prop-types';
import LoginWrapper from './index.style';

const Login = ({
    username, password, onUsernameChange, onPasswordChange, onSubmit,
}) => (
    <LoginWrapper>
        <input
            placeholder="Username"
            value={username}
            onChange={(e) => onUsernameChange(e)}
        />

        <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e)}
        />

        <button
            onClick={onSubmit}
            type="button"
        >
            Submit
        </button>
    </LoginWrapper>
);

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

Login.defaultProps = {
    username: '',
    password: '',
};

export default Login;
