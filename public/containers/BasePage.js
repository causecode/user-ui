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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var react_router_dom_1 = require("react-router-dom");
var react_hero_1 = require("react-hero");
var ForgotPasswordPage_1 = require("../demo/ForgotPasswordPage");
var ResetPasswordPage_1 = require("../demo/ResetPasswordPage");
var SignupPage_1 = require("../demo/SignupPage");
var LoginPage_1 = require("../demo/LoginPage");
var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasePage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/login", component: LoginPage_1.LoginPage }),
                React.createElement(react_router_dom_1.Route, { path: "/resetPassword", component: ResetPasswordPage_1.ResetPasswordPage }),
                React.createElement(react_router_dom_1.Route, { path: "/forgotPassword", component: ForgotPasswordPage_1.ForgotPasswordPage }),
                React.createElement(react_router_dom_1.Route, { path: "/signup", component: SignupPage_1.SignupPage }),
                React.createElement(react_router_dom_1.Route, { path: "/:resource/list", component: react_hero_1.ListPage }),
                React.createElement(react_router_dom_1.Route, { path: "/:resource/show/:resourceID", component: react_hero_1.ShowPage }),
                React.createElement(react_router_dom_1.Route, { path: "/:resource/edit/:resourceID", component: react_hero_1.EditPage }))));
    };
    BasePage = __decorate([
        Radium
    ], BasePage);
    return BasePage;
}(React.Component));
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map