import * as React from 'react';
import {LoginPanel} from '../components';
import {Link} from '../components/ReusableComponents';

export class LoginPage extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <LoginPanel
                        onSubmit="api/login"
                        onLoginSuccess="/"
                        onForgotPassword="forgotPassword"
                        onSignup="/"
                />
            </div>
        );
    }
}
