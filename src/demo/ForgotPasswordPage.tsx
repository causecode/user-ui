import * as React from 'react';
import {Link} from '../containers/ReusableComponents';
import {ForgotPasswordPanel} from '../containers';

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
