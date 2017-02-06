import * as React from 'react';
import {ForgotPasswordPage} from '../components';
import {Link} from 'react-router';
import {config} from 'react-hero';

export class TestForgotPassword extends React.Component<void, void> {
    
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <ForgotPasswordPage
                        onSubmitUrl={`${config.APIUrl}user/action/forgotPassword`}
                        successUrl="/"
                />
            </div>
        );
    }
}
