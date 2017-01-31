import * as React from 'react';
import {SignupPage} from '../components';
import {Link} from 'react-router';

export class TestSignup extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <SignupPage
                        onSubmit="http://localhost:9000/api/v1/user/action/signUp"
                        onLogin="/"
                        onSuccess="/"
                        recaptchaSiteKey="6LdTzxAUAAAAADcMJb2YJ_-79JjSPjC9kP6tMmH7"
                />
            </div>
        );
    }
}
