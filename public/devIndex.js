"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_dom_1 = require("react-dom");
var react_hero_1 = require("react-hero");
var BasePage_1 = require("./components/BasePage");
var store_1 = require("./store");
var reactRouterDom = require('react-router-dom');
react_hero_1.ModelService.registerAll();
react_hero_1.ComponentService.registerAll();
var BrowserRouter = reactRouterDom.BrowserRouter, Route = reactRouterDom.Route;
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(BrowserRouter, null,
        React.createElement(Route, { path: "/", component: BasePage_1.BasePage }))), document.getElementsByClassName('main-container')[0]);
//# sourceMappingURL=devIndex.js.map