import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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

        expect(screen.getByText('Submit')).toBeInTheDocument();
    });
});
