"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var components_1 = require("../components");
var react_router_1 = require("react-router");
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        return _super.apply(this, arguments) || this;
    }
    LoginPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_router_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(components_1.LoginPanel, { onSubmit: "api/login", onLoginSuccess: "/", onForgotPassword: "forgotPassword", onSignup: "/" })));
    };
    return LoginPage;
}(React.Component));
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map