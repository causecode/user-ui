import * as React from 'react';
import {StyleRoot} from 'radium';
import {ListPage, EditPage, ShowPage} from 'react-hero';
import {ForgotPasswordPage} from '../demo/ForgotPasswordPage';
import {ResetPasswordPage} from '../demo/ResetPasswordPage';
import {SignupPage} from '../demo/SignupPage';
import {LoginPage} from '../demo/LoginPage';
const reactRouterDom = require<any>('react-router-dom');

export class BasePage extends React.Component<void, void> {
    render(): JSX.Element {
        const {Switch, Route} = reactRouterDom;

        return (
            <StyleRoot>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/resetPassword" component={ResetPasswordPage}/>
                    <Route path="/forgotPassword" component={ForgotPasswordPage}/>
                    <Route path="/signup" component={SignupPage}/>
                    <Route path="/:resource/list" component={ListPage}/>
                    <Route path="/:resource/show/:resourceID" component={ShowPage} />
                    <Route path="/:resource/edit/:resourceID" component={EditPage} />
                </Switch>
            </StyleRoot>
        );
    }
}
