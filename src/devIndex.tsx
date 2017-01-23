import * as React from 'react';
import {render} from 'react-dom';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {BasePage} from './components/BasePage';
import {store} from './store';
import {DemoPage} from './demo/DemoPage';

render(
   <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={BasePage}>
                <IndexRoute component={DemoPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
