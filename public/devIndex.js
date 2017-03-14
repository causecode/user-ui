"use strict";
var React = require("react");
var react_hero_1 = require("react-hero");
var react_router_1 = require("react-router");
var ForgotPasswordPage_1 = require("./demo/ForgotPasswordPage");
var ResetPasswordPage_1 = require("./demo/ResetPasswordPage");
var SignupPage_1 = require("./demo/SignupPage");
var LoginPage_1 = require("./demo/LoginPage");
var BasePage_1 = require("./components/BasePage");
var react_redux_1 = require("react-redux");
var react_dom_1 = require("react-dom");
var store_1 = require("./store");
react_hero_1.ModelService.registerAll();
react_hero_1.ComponentService.registerAll();
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(react_router_1.Router, { history: react_router_1.hashHistory },
        React.createElement(react_router_1.Route, { path: "/", component: BasePage_1.BasePage },
            React.createElement(react_router_1.IndexRoute, { component: LoginPage_1.LoginPage }),
            React.createElement(react_router_1.Route, { path: "resetPassword", component: ResetPasswordPage_1.ResetPasswordPage }),
            React.createElement(react_router_1.Route, { path: "forgotPassword", component: ForgotPasswordPage_1.ForgotPasswordPage }),
            React.createElement(react_router_1.Route, { path: "signup", component: SignupPage_1.SignupPage }),
            React.createElement(react_router_1.Route, { path: "/:resource/list", component: react_hero_1.ListPage }),
            React.createElement(react_router_1.Route, { path: "/:resource/show/:resourceID", component: react_hero_1.ShowPage }),
            React.createElement(react_router_1.Route, { path: "/:resource/edit/:resourceID", component: react_hero_1.EditPage })))), document.getElementsByClassName('main-container')[0]);
//# sourceMappingURL=devIndex.js.map