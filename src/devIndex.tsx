import * as React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {ComponentService, ModelService} from 'react-hero';
import {BasePage} from './components/BasePage';
import {store} from './store';
const reactRouterDom = require<any>('react-router-dom');

ModelService.registerAll();
ComponentService.registerAll();
let{BrowserRouter, Route} = reactRouterDom;

render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={BasePage}/>
        </BrowserRouter>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
