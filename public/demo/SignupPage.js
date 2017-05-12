"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var components_1 = require("../components");
var react_router_1 = require("react-router");
var SignupPage = (function (_super) {
    __extends(SignupPage, _super);
    function SignupPage() {
        return _super.apply(this, arguments) || this;
    }
    SignupPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_router_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(components_1.SignupPanel, { onSubmitUrl: "user/action/signUp", onLoginUrl: "/", onSuccess: "/", recaptchaSiteKey: "6LdTzxAUAAAAADcMJb2YJ_-79JjSPjC9kP6tMmH7" })));
    };
    return SignupPage;
}(React.Component));
exports.SignupPage = SignupPage;
//# sourceMappingURL=SignupPage.js.map