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
var ReusableComponents_1 = require("./ReusableComponents");
var react_redux_1 = require("react-redux");
var ErrorMessage_1 = require("./ErrorMessage");
var PanelHeader_1 = require("./PanelHeader");
var UserModel_1 = require("../models/UserModel");
var react_router_1 = require("react-router");
var palette_1 = require("../constants/palette");
var LoginPanelImpl = (function (_super) {
    __extends(LoginPanelImpl, _super);
    function LoginPanelImpl() {
        var _this = _super.call(this) || this;
        _this.handleRememberCheckbox = function () {
            var isChecked = _this.state.rememberMe;
            _this.setState({ rememberMe: !isChecked });
        };
        _this.handleInput = function (event) {
            var value = event.target["value"];
            var inputType = event.target["id"];
            if (value) {
                _this.setState((_a = {}, _a["" + inputType] = value, _a[inputType + "Error"] = null, _a));
            }
            var _a;
        };
        _this.submitForm = function (event) {
            event.preventDefault();
            var _a = _this.props, onSubmit = _a.onSubmit, onLoginSuccess = _a.onLoginSuccess, history = _a.history, getBasicUserData = _a.getBasicUserData;
            var email = _this.state.email;
            var password = _this.state.password;
            if (!email && !password) {
                _this.setState({ emailError: 'error', passwordError: 'error' });
            }
            else if (!email) {
                _this.setState({ emailError: 'error' });
            }
            else if (!password) {
                _this.setState({ passwordError: 'error' });
            }
            else {
                var requestData = {
                    email: email,
                    password: password,
                    remember_me: _this.state.rememberMe,
                };
                UserModel_1.UserModel.login(onSubmit, requestData, onLoginSuccess, history, getBasicUserData);
            }
        };
        _this.renderPanelFooter = function () {
            return (React.createElement("div", { style: palette_1.defaultFooterContainer },
                React.createElement("div", { style: palette_1.pullLeft },
                    React.createElement(ReusableComponents_1.Link, { to: _this.props.onForgotPassword, style: _this.props.footerLinkStyle },
                        React.createElement("strong", null, "Forgot password?")),
                    React.createElement("br", null),
                    React.createElement(ReusableComponents_1.Link, { to: _this.props.onSignup, style: _this.props.footerLinkStyle },
                        React.createElement("strong", null, _this.props.allowSignup ? 'Sign up now' : ''))),
                React.createElement("div", { style: palette_1.pullRight },
                    React.createElement(ReusableComponents_1.Button, { type: "submit", style: _this.props.submitButtonStyle }, _this.props.submitButtonContent || 'Log in'))));
        };
        _this.renderRememberMeCheckbox = function () {
            return (React.createElement(ReusableComponents_1.Checkbox, { id: "rememberMeCheckbox", onChange: _this.handleRememberCheckbox },
                React.createElement("strong", null, "Remember Me")));
        };
        _this.state = { email: '', password: '', rememberMe: false, emailError: null, passwordError: null };
        return _this;
    }
    LoginPanelImpl.prototype.render = function () {
        return (React.createElement("div", { style: this.props.loginContainerStyle || palette_1.defaultPanelContainer },
            React.createElement("form", { onSubmit: this.submitForm, id: "loginForm" },
                React.createElement(ReusableComponents_1.Panel, { header: React.createElement(PanelHeader_1.PanelHeader, { headerStyle: this.props.panelTitleStyle, headerText: this.props.panelTitle || 'Please enter your details.' }), footer: this.renderPanelFooter() },
                    React.createElement(ReusableComponents_1.FormGroup, { validationState: this.state.emailError, style: palette_1.removeMarginAndPadding },
                        React.createElement(ReusableComponents_1.FormControl, { id: "email", type: "text", placeholder: this.props.emailPlaceholder || 'email', style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleInput }),
                        React.createElement(ReusableComponents_1.HelpBlock, null, this.state.emailError ? 'This field is required.' : null)),
                    React.createElement(ReusableComponents_1.FormGroup, { validationState: this.state.passwordError, style: palette_1.removeMarginAndPadding },
                        React.createElement(ReusableComponents_1.FormControl, { id: "password", type: "password", placeholder: this.props.passwordPlaceholder || 'Password', style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleInput }),
                        React.createElement(ReusableComponents_1.HelpBlock, null, this.state.passwordError ? 'This field is required.' : null)),
                    this.props.showRememberMeCheckbox ? this.renderRememberMeCheckbox() : null,
                    React.createElement(ErrorMessage_1.ErrorMessage, { message: this.props.errorMessage })))));
    };
    return LoginPanelImpl;
}(React.Component));
LoginPanelImpl.defaultProps = {
    allowSignup: true,
};
LoginPanelImpl = __decorate([
    Radium
], LoginPanelImpl);
exports.LoginPanelImpl = LoginPanelImpl;
var mapStateToProps = function (state) {
    return {
        isLoggedIn: state.currentUser.get('isLoggedIn'),
        errorMessage: state.currentUser.get('loginErrorMessage'),
    };
};
var LoginPanel = react_router_1.withRouter(react_redux_1.connect(mapStateToProps)(LoginPanelImpl));
exports.LoginPanel = LoginPanel;
//# sourceMappingURL=LoginPanel.js.map