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
var react_router_1 = require("react-router");
var palette_1 = require("../constants/palette");
var ReusableComponents_1 = require("./ReusableComponents");
var ErrorMessage_1 = require("./ErrorMessage");
var PanelHeader_1 = require("./PanelHeader");
var PanelFooter_1 = require("./PanelFooter");
var UserModel_1 = require("../models/UserModel");
var token = '';
var email = '';
var ResetPasswordPanelImpl = (function (_super) {
    __extends(ResetPasswordPanelImpl, _super);
    function ResetPasswordPanelImpl() {
        var _this = _super.call(this) || this;
        _this.componentWillMount = function () {
            var redirectUrl = window.location.href;
            if (redirectUrl.indexOf('token') >= 0 && redirectUrl.indexOf('email') >= 0) {
                var urlArray = redirectUrl.split('&');
                token = urlArray[1].substring(urlArray[1].indexOf('=') + 1);
                email = urlArray[2].substring(urlArray[2].indexOf('=') + 1);
            }
        };
        _this.handleInputChange = function (event) {
            var value = event.target["value"];
            var inputType = event.target["id"];
            if (value) {
                _this.setState((_a = {}, _a["" + inputType] = value, _a[inputType + "Error"] = null, _a));
            }
            var _a;
        };
        _this.submitForm = function (event) {
            event.preventDefault();
            var newPassword = _this.state.newPassword;
            var confirmPassword = _this.state.confirmPassword;
            if (!newPassword) {
                _this.setState({ newPasswordError: 'error' });
            }
            else if (!confirmPassword) {
                _this.setState({ confirmPasswordError: 'error' });
            }
            else if (newPassword !== confirmPassword) {
                _this.setState({ passwordChanged: false, errorMessage: 'Passwords do not match.' });
            }
            else {
                UserModel_1.UserModel.resetPassword(_this.props.onSubmitUrl, token, email, newPassword, confirmPassword)
                    .then(function (response) {
                    _this.setState({ passwordChanged: true, errorMessage: '' });
                    if (_this.props.successUrl) {
                        _this.props.history.push(_this.props.successUrl);
                    }
                }).catch(function (error) {
                    _this.setState({ passwordChanged: false, errorMessage: error.data.message });
                });
            }
        };
        _this.handleLoginButton = function () {
            _this.props.history.push(_this.props.onLoginUrl || 'login');
        };
        _this.renderPanelFooter = function () {
            return (React.createElement(PanelFooter_1.PanelFooter, { otherButtonStyle: _this.props.loginButtonStyle, otherButtonContent: "Log in", otherButtonOnClick: _this.handleLoginButton, showOnlySubmitButton: true, submitForm: true, submitButtonStyle: [_this.props.submitButtonStyle, { visibility: _this.state.passwordChanged ? 'hidden' : 'visible' }], submitButtonContent: _this.props.submitButtonContent || 'Reset Password' }));
        };
        _this.state = {
            newPassword: '',
            confirmPassword: '',
            newPasswordError: null,
            confirmPasswordError: null,
            passwordChanged: false,
            errorMessage: '',
        };
        return _this;
    }
    ResetPasswordPanelImpl.prototype.render = function () {
        var headerText = !this.state.passwordChanged ?
            this.props.paneltitle || 'Enter your new password' : 'Password Changed';
        return (React.createElement("div", { style: this.props.resetPasswordContainerStyle || palette_1.defaultPanelContainer },
            React.createElement("form", { style: { padding: '10px 0px' }, onSubmit: this.submitForm, id: "resetPaswordForm" },
                React.createElement(ReusableComponents_1.Panel, { header: React.createElement(PanelHeader_1.PanelHeader, { headerText: headerText, headerStyle: this.props.panelTitleStyle }), footer: this.renderPanelFooter() },
                    React.createElement("label", { style: { visibility: this.state.passwordChanged ? 'visible' : 'hidden' } }, "Password changed successfully. Please login to continue."),
                    React.createElement("div", { style: { visibility: this.state.passwordChanged ? 'hidden' : 'visible' } },
                        React.createElement("label", null, "Please enter your new password:"),
                        React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding, validationState: this.state.newPasswordError },
                            React.createElement(ReusableComponents_1.FormControl, { id: "newPassword", type: "password", style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleInputChange, placeholder: "Enter your new password" }),
                            React.createElement(ReusableComponents_1.HelpBlock, null, this.state.newPasswordError ? 'This field is required.' : null)),
                        React.createElement("label", null, "Enter your new password again:"),
                        React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding, validationState: this.state.confirmPasswordError },
                            React.createElement(ReusableComponents_1.FormControl, { id: "confirmPassword", type: "password", style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleInputChange, placeholder: "Enter your new password again" }),
                            React.createElement(ReusableComponents_1.HelpBlock, null, this.state.confirmPasswordError ? 'This field is required.' : null))),
                    React.createElement(ErrorMessage_1.ErrorMessage, { message: this.state.errorMessage })))));
    };
    return ResetPasswordPanelImpl;
}(React.Component));
ResetPasswordPanelImpl = __decorate([
    Radium
], ResetPasswordPanelImpl);
exports.ResetPasswordPanelImpl = ResetPasswordPanelImpl;
exports.ResetPasswordPanel = react_router_1.withRouter(ResetPasswordPanelImpl);
//# sourceMappingURL=ResetPasswordPanel.js.map