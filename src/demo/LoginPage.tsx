import * as React from 'react';
import {Link} from '../containers/ReusableComponents';
import {LoginPanel} from '../containers';

export class LoginPage extends React.Component {
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
