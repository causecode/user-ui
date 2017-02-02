import * as React from 'react';
import {LoginPage} from '../components';
import {Link} from 'react-router';

export class TestLogin extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <LoginPage
                        onSubmit="http://localhost/api/login"
                        onLoginSuccess="/"
                        onForgotPassword="/"
                        onSignup="/"
                />
            </div>
        );
    }
}
