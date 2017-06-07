import * as React from 'react';
import {ResetPasswordPanel} from '../components';
import {Link} from '../components/ReusableComponents';

export class ResetPasswordPage extends React.Component<void, void> {

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
