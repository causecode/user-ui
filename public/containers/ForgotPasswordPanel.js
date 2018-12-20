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
var ReusableComponents_1 = require("./ReusableComponents");
var palette_1 = require("../constants/palette");
var ErrorMessage_1 = require("./ErrorMessage");
var PanelHeader_1 = require("./PanelHeader");
var PanelFooter_1 = require("./PanelFooter");
var UserModel_1 = require("../models/UserModel");
var ForgotPasswordPanelImpl = (function (_super) {
    __extends(ForgotPasswordPanelImpl, _super);
    function ForgotPasswordPanelImpl() {
        var _this = _super.call(this) || this;
        _this.handleEmail = function (event) {
            var value = event.target["value"];
            if (value) {
                _this.setState({ email: value, usernameError: null });
            }
        };
        _this.submitForm = function (event) {
            event.preventDefault();
            var email = _this.state.email;
            if (!email) {
                _this.setState({ usernameError: 'error' });
            }
            else {
                UserModel_1.UserModel.forgotPassword(_this.props.onSubmitUrl, email)
                    .then(function (response) {
                    _this.setState({ showInputField: false, errorMessage: '' });
                })
                    .catch(function (error) {
                    _this.setState({ errorMessage: error.data.message });
                });
            }
        };
        _this.handleLoginButton = function () {
            _this.props.history.push(_this.props.onLoginUrl);
        };
        _this.renderSuccessMessage = function () {
            return (React.createElement("div", null,
                "Follow the instructions sent to your email address to reset your password.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("span", { style: successMessage },
                    "Didn't receive the email? \u00A0",
                    React.createElement("a", { id: "tryAgain", style: _this.props.tryAgainLinkStyle, onClick: _this.resetState }, "Try Again"),
                    ".")));
        };
        _this.renderInputField = function () {
            return (React.createElement(ReusableComponents_1.FormGroup, { validationState: _this.state.usernameError, style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.FormControl, { id: "email", type: "text", placeholder: _this.props.usernamePlaceholder || 'Username or email', style: _this.props.inputStyle || palette_1.defaultInputStyle, onChange: _this.handleEmail }),
                React.createElement(ReusableComponents_1.HelpBlock, null, _this.state.usernameError ? 'This field is required.' : null)));
        };
        _this.resetState = function () {
            _this.setState({
                email: '',
                usernameError: null,
                errorMessage: '',
                showInputField: true,
            });
        };
        _this.renderFooter = function () {
            return (React.createElement(PanelFooter_1.PanelFooter, { otherButtonStyle: _this.props.loginButtonStyle, otherButtonContent: _this.props.loginButtonContent || 'Log in', otherButtonOnClick: _this.handleLoginButton, submitForm: true, submitButtonContent: _this.props.submitButtonContent || 'Reset Password', submitButtonStyle: [
                    _this.props.submitButtonStyle,
                    { visibility: _this.state.showInputField ? 'visible' : 'hidden' },
                ] }));
        };
        _this.state = {
            email: '',
            usernameError: null,
            errorMessage: '',
            showInputField: true,
        };
        return _this;
    }
    ForgotPasswordPanelImpl.prototype.render = function () {
        var bodyText = this.props.bodyText || 'Please enter the email you use for your account.';
        var panelTitle = this.state.showInputField ?
            this.props.panelTitle || 'Forgot Password?' : 'Check Your Email';
        return (React.createElement("div", { style: this.props.forgotPasswordContainerStyle || palette_1.defaultPanelContainer },
            React.createElement("form", { onSubmit: this.submitForm, id: "forgotPasswordForm" },
                React.createElement(ReusableComponents_1.Panel, { header: React.createElement(PanelHeader_1.PanelHeader, { headerText: panelTitle, headerStyle: this.props.panelTitleStyle }), footer: this.renderFooter() },
                    React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                        React.createElement("label", { style: this.props.bodyTextStyle }, this.state.showInputField ? bodyText : this.renderSuccessMessage())),
                    this.state.showInputField ? this.renderInputField() : null,
                    React.createElement(ErrorMessage_1.ErrorMessage, { message: this.state.errorMessage })))));
    };
    ForgotPasswordPanelImpl = __decorate([
        Radium
    ], ForgotPasswordPanelImpl);
    return ForgotPasswordPanelImpl;
}(React.Component));
exports.ForgotPasswordPanelImpl = ForgotPasswordPanelImpl;
exports.ForgotPasswordPanel = react_router_1.withRouter(ForgotPasswordPanelImpl);
var successMessage = {
    fontSize: '16px',
    fontWeight: 400,
};
//# sourceMappingURL=ForgotPasswordPanel.js.map