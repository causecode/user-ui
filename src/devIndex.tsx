import * as React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {BasePage} from './components/BasePage';
import {store} from './store';
import {TestLogin} from './demo/TestLogin';
import {TestForgotPassword} from './demo/TestForgotPassword';
import {ListPage, EditPage, ShowPage, ComponentService, ModelService} from 'react-hero';
import {TestSignup} from './demo/TestSignup';
import {TestResetPassword} from './demo/TestResetPassword';

ModelService.registerAll();
ComponentService.registerAll();

render(
   <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={BasePage}>
                <IndexRoute component={TestLogin}/>
                <Route path="resetPassword" component={TestResetPassword}/>
                <Route path="/:resource/list" component={ListPage}/>
                <Route path="/:resource/show/:resourceID" component={ShowPage} />
                <Route path="/:resource/edit/:resourceID" component={EditPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
