import * as React from 'react';
import {ResetPasswordPanel} from '../components';
import {Link, IInjectedProps} from 'react-router';

export class ResetPasswordPage extends React.Component<IInjectedProps, void> {
    
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <ResetPasswordPanel
                        onSubmitUrl="user/action/resetPassword"
                />
            </div>
        );
    }
}
