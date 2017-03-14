"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var components_1 = require("../components");
var react_router_1 = require("react-router");
var ResetPasswordPage = (function (_super) {
    __extends(ResetPasswordPage, _super);
    function ResetPasswordPage() {
        return _super.apply(this, arguments) || this;
    }
    ResetPasswordPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_router_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(components_1.ResetPasswordPanel, { onSubmitUrl: "user/action/resetPassword" })));
    };
    return ResetPasswordPage;
}(React.Component));
exports.ResetPasswordPage = ResetPasswordPage;
//# sourceMappingURL=ResetPasswordPage.js.map