"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var radium_1 = require("radium");
var react_hero_1 = require("react-hero");
var ForgotPasswordPage_1 = require("../demo/ForgotPasswordPage");
var ResetPasswordPage_1 = require("../demo/ResetPasswordPage");
var SignupPage_1 = require("../demo/SignupPage");
var LoginPage_1 = require("../demo/LoginPage");
var reactRouterDom = require('react-router-dom');
var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasePage.prototype.render = function () {
        var Switch = reactRouterDom.Switch, Route = reactRouterDom.Route;
        return (React.createElement(radium_1.StyleRoot, null,
            React.createElement(Switch, null,
                React.createElement(Route, { path: "/login", component: LoginPage_1.LoginPage }),
                React.createElement(Route, { path: "/resetPassword", component: ResetPasswordPage_1.ResetPasswordPage }),
                React.createElement(Route, { path: "/forgotPassword", component: ForgotPasswordPage_1.ForgotPasswordPage }),
                React.createElement(Route, { path: "/signup", component: SignupPage_1.SignupPage }),
                React.createElement(Route, { path: "/:resource/list", component: react_hero_1.ListPage }),
                React.createElement(Route, { path: "/:resource/show/:resourceID", component: react_hero_1.ShowPage }),
                React.createElement(Route, { path: "/:resource/edit/:resourceID", component: react_hero_1.EditPage }))));
    };
    return BasePage;
}(React.Component));
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map