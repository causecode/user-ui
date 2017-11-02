import * as React from 'react';
import {StyleRoot} from 'radium';
import {Switch, Route} from 'react-router-dom';
import {ListPage, EditPage, ShowPage} from 'react-hero';
import {ForgotPasswordPage} from '../demo/ForgotPasswordPage';
import {ResetPasswordPage} from '../demo/ResetPasswordPage';
import {SignupPage} from '../demo/SignupPage';
import {LoginPage} from '../demo/LoginPage';

export class BasePage extends React.Component {
    render(): JSX.Element {
        return (
            <div>
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
            </div>
        );
    }
}
