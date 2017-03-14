"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var Radium = require("radium");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var ReusableComponents_1 = require("../ReusableComponents");
var SignupForm_1 = require("./SignupForm");
var UserModel_1 = require("../../models/UserModel");
var utils_1 = require("../../utils");
var signupAction_1 = require("../../actions/signupAction");
var ErrorMessage_1 = require("../ErrorMessage");
var PanelHeader_1 = require("../PanelHeader");
var PanelFooter_1 = require("../PanelFooter");
var FontAwesome = require("react-fontawesome");
var SignupPanelImpl = (function (_super) {
    __extends(SignupPanelImpl, _super);
    function SignupPanelImpl() {
        var _this = _super.call(this) || this;
        _this.submitForm = function () {
            var _a = _this.props, userData = _a.userData, onSubmitUrl = _a.onSubmitUrl, onSuccess = _a.onSuccess;
            delete userData.signupErrorMessage;
            var error = '';
            for (var key in userData) {
                if (!userData[key]) {
                    error = 'All the fields are mandatory';
                }
            }
            error ? utils_1.dispatchToStore(signupAction_1.updateSignupError(error)) : UserModel_1.UserModel.signup(onSubmitUrl, userData, onSuccess);
        };
        _this.showSignupForm = function () {
            _this.setState({ displaySignupForm: true });
        };
        _this.handleLoginButton = function () {
            react_router_1.browserHistory.push(_this.props.onLoginUrl);
        };
        _this.renderPanelFooter = function () {
            return (React.createElement(PanelFooter_1.PanelFooter, { submitButtonContent: _this.props.submitButtonContent || 'Sign Up', submitButtonStyle: _this.props.submitButtonStyle, onSubmit: _this.submitForm, otherButtonContent: _this.props.loginButtonContent || 'Log in', otherButtonStyle: _this.props.loginButtonStyle, otherButtonOnClick: _this.handleLoginButton }));
        };
        _this.renderSignupForm = function () {
            return (React.createElement(SignupForm_1.SignupForm, { id: "signupForm", inputStyle: _this.props.inputStyle, recaptchaSiteKey: _this.props.recaptchaSiteKey }));
        };
        _this.showSignupOptions = function () {
            return (React.createElement("div", null,
                React.createElement(ReusableComponents_1.Button, { id: "signupWithEmail", style: _this.props.signupOptionsButtonStyle || defaultOptionStyle, onClick: _this.showSignupForm },
                    React.createElement(FontAwesome, { name: "envelope" }),
                    "Sign up with Email")));
        };
        _this.state = { displaySignupForm: false };
        return _this;
    }
    SignupPanelImpl.prototype.render = function () {
        return (React.createElement("div", { style: this.props.signupContainerStyle || defaultPanelContainer },
            React.createElement(ReusableComponents_1.Panel, { header: React.createElement(PanelHeader_1.PanelHeader, { headerText: this.props.panelTitle || 'Sign up', headerStyle: this.props.panelTitleStyle }), footer: this.renderPanelFooter() },
                this.state.displaySignupForm ? this.renderSignupForm() : this.showSignupOptions(),
                React.createElement(ErrorMessage_1.ErrorMessage, { message: this.props.userData.signupErrorMessage }))));
    };
    return SignupPanelImpl;
}(React.Component));
SignupPanelImpl = __decorate([
    Radium
], SignupPanelImpl);
exports.SignupPanelImpl = SignupPanelImpl;
var mapStateToProps = function (state) {
    return {
        userData: state.signupData.toJS()
    };
};
var SignupPanel = react_redux_1.connect(mapStateToProps)(SignupPanelImpl);
exports.SignupPanel = SignupPanel;
var defaultOptionStyle = {
    width: '100%',
    textAlign: 'center'
};
var defaultPanelContainer = {
    maxWidth: '650px',
    margin: '0px auto',
    padding: '30px'
};
//# sourceMappingURL=SignupPanel.js.map