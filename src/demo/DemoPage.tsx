import * as React from 'react';
import {SignupPage} from '../components';
import {CSS} from '../interfaces';

export class DemoPage extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>
                <SignupPage
                        panelTitleStyle={panelTitleStyle}
                        onSubmitUrl="http://localhost:8090/"
                        onSuccessUrl="http://localhost:8090/"
                        onLoginButtonClick="http://localhost:8090/"
                />
            </div>
        );
    }
}

const panelTitleStyle: CSS = {
    fontSize: '30px',
    fontWeight: 'bold'
};
