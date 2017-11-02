import * as React from 'react';
import {Link} from '../containers/ReusableComponents';
import {ResetPasswordPanel} from '../containers';

export class ResetPasswordPage extends React.Component {

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
