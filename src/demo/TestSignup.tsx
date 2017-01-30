import * as React from 'react';
import {SignupPage} from '../components';
import {Link} from 'react-router';

export class TestSignup extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <Link to="/userManagement/list">UserManagement</Link>
                <SignupPage
                        onSubmit="http://localhost:9000/api/login"
                        onLogin="/"
                        onSuccess="/"
                />
            </div>
        );
    }
}
