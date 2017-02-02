import * as React from 'react';
import * as Axios from 'axios';
import {ResetPasswordPanel} from '../components/ResetPasswordPanel';
import {Link} from 'react-router';
import {config} from 'react-hero';

export class TestResetPassword extends React.Component<void, void> {
    
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <ResetPasswordPanel
                        onSubmitUrl={`${config.APIUrl}user/action/resetPassword`}
                        successUrl="/"
                />
            </div>
        );
    }
}
