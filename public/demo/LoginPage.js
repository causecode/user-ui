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
var ReusableComponents_1 = require("../containers/ReusableComponents");
var containers_1 = require("../containers");
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(ReusableComponents_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(containers_1.LoginPanel, { onSubmit: "api/login", onLoginSuccess: "/", onForgotPassword: "forgotPassword", onSignup: "/" })));
    };
    return LoginPage;
}(React.Component));
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map