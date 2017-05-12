"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var components_1 = require("../components");
var react_router_1 = require("react-router");
var ForgotPasswordPage = (function (_super) {
    __extends(ForgotPasswordPage, _super);
    function ForgotPasswordPage() {
        return _super.apply(this, arguments) || this;
    }
    ForgotPasswordPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_router_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(components_1.ForgotPasswordPanel, { onSubmitUrl: "user/action/forgotPassword", onLoginUrl: "" })));
    };
    return ForgotPasswordPage;
}(React.Component));
exports.ForgotPasswordPage = ForgotPasswordPage;
//# sourceMappingURL=ForgotPasswordPage.js.map