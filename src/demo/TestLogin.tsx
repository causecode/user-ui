import * as React from 'react';
import {LoginPage} from '../components';
import {CSS} from '../interfaces';
import {Link} from 'react-router';

export class TestLogin extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <LoginPage
                        onSubmit="http://localhost:9000/api/login"
                        onLoginSuccess="/"
                        onForgotPassword="/"
                        onSignup="/"
                />
            </div>
        );
    }
}

const panelTitleStyle: CSS = {
    fontSize: '30px',
    fontWeight: 'bold'
};
