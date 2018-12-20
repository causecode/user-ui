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
var ResetPasswordPage = (function (_super) {
    __extends(ResetPasswordPage, _super);
    function ResetPasswordPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResetPasswordPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(ReusableComponents_1.Link, { to: "/userManagement/list" }, "UserManagement"),
            React.createElement(containers_1.ResetPasswordPanel, { onSubmitUrl: "user/action/resetPassword" })));
    };
    return ResetPasswordPage;
}(React.Component));
exports.ResetPasswordPage = ResetPasswordPage;
//# sourceMappingURL=ResetPasswordPage.js.map