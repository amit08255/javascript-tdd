import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './index';

describe('Login component tests', () => {
    test('renders correctly', () => {
        render(
            <Login
                username={' '}
                password={' '}
                onUsernameChange={(e) => e}
                onPasswordChange={(e) => e}
                onSubmit={(e) => e}
            />,
        );

        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    test('login input event handler works correctly', () => {
        const username = 'amit';
        const password = 'pass';
        const onUsernameChange = jest.fn();
        const onPasswordChange = jest.fn();
        const onSubmitClick = jest.fn();

        render(
            <Login
                username={' '}
                password={' '}
                onUsernameChange={(e) => onUsernameChange(e.target.value)}
                onPasswordChange={(e) => onPasswordChange(e.target.value)}
                onSubmit={onSubmitClick}
            />,
        );

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: {
                value: username,
            },
        });

        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: {
                value: password,
            },
        });

        fireEvent.click(screen.getByText(/submit/i));

        expect(onUsernameChange).toHaveBeenCalledWith(username);
        expect(onPasswordChange).toHaveBeenCalledWith(password);
        expect(onSubmitClick).toHaveBeenCalled();
    });
});
