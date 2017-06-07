import * as React from 'react';
import {ForgotPasswordPanel} from '../components';
import {Link} from '../components/ReusableComponents';

export class ForgotPasswordPage extends React.Component<void, void> {

    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <ForgotPasswordPanel
                        onSubmitUrl="user/action/forgotPassword"
                        onLoginUrl=""
                />
            </div>
        );
    }
}
