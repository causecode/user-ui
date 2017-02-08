import * as React from 'react';
import {LoginPanel} from '../components';
import {Link} from 'react-router';

export class LoginPage extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <LoginPanel
                        onSubmit="http://localhost/api/login"
                        onLoginSuccess="/"
                        onForgotPassword="forgotPassword"
                        onSignup="/"
                />
            </div>
        );
    }
}
