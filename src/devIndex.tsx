import * as React from 'react';
import {ListPage, EditPage, ShowPage, ComponentService, ModelService} from 'react-hero';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {ForgotPasswordPage} from './demo/ForgotPasswordPage';
import {ResetPasswordPage} from './demo/ResetPasswordPage';
import {SignupPage} from './demo/SignupPage';
import {LoginPage} from './demo/LoginPage';
import {BasePage} from './components/BasePage';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {store} from './store';

ModelService.registerAll();
ComponentService.registerAll();

render(
   <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={BasePage}>
                <IndexRoute component={LoginPage}/>
                <Route path="resetPassword" component={ResetPasswordPage}/>
                <Route path="forgotPassword" component={ForgotPasswordPage}/>
                <Route path="signup" component={SignupPage}/>
                <Route path="/:resource/list" component={ListPage}/>
                <Route path="/:resource/show/:resourceID" component={ShowPage} />
                <Route path="/:resource/edit/:resourceID" component={EditPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
