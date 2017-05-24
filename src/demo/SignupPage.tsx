import * as React from 'react';
import {SignupPanel} from '../components';
import {Link} from '../components/ReusableComponents';

export class SignupPage extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <SignupPanel
                        onSubmitUrl={`user/action/signUp`}
                        onLoginUrl="/"
                        onSuccess="/"
                        recaptchaSiteKey="6LdTzxAUAAAAADcMJb2YJ_-79JjSPjC9kP6tMmH7"
                />
            </div>
        );
    }
}
