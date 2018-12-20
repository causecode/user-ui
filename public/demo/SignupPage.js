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
var containers_1 = require("../containers");
var ReusableComponents_1 = require("../containers/ReusableComponents");
var SignupPage = (function (_super) {
    __extends(SignupPage, _super);
    function SignupPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignupPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(ReusableComponents_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(containers_1.SignupPanel, { onSubmitUrl: "user/action/signUp", onLoginUrl: "/", onSuccess: "/", recaptchaSiteKey: "6LdTzxAUAAAAADcMJb2YJ_-79JjSPjC9kP6tMmH7" })));
    };
    return SignupPage;
}(React.Component));
exports.SignupPage = SignupPage;
//# sourceMappingURL=SignupPage.js.map