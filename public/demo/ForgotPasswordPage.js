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
var components_1 = require("../components");
var ReusableComponents_1 = require("../components/ReusableComponents");
var ForgotPasswordPage = (function (_super) {
    __extends(ForgotPasswordPage, _super);
    function ForgotPasswordPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForgotPasswordPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(ReusableComponents_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(components_1.ForgotPasswordPanel, { onSubmitUrl: "user/action/forgotPassword", onLoginUrl: "" })));
    };
    return ForgotPasswordPage;
}(React.Component));
exports.ForgotPasswordPage = ForgotPasswordPage;
//# sourceMappingURL=ForgotPasswordPage.js.map