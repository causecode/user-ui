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
var ReusableComponents_1 = require("../ReusableComponents");
var palette_1 = require("../../constants/palette");
var utils_1 = require("../../utils");
var ReactDateTime = require('react-datetime');
var SignupForm = (function (_super) {
    __extends(SignupForm, _super);
    function SignupForm() {
        var _this = _super.call(this) || this;
        _this.changeGender = function (event) {
            _this.setState({ genderSelected: event.target["value"] });
            utils_1.handleSignupInput('gender', event.target["value"]);
        };
        _this.handleTextInputChange = function (event) {
            utils_1.handleSignupInput(event.target["id"], event.target["value"]);
        };
        _this.handleCaptcha = function (value) {
            utils_1.handleSignupInput('myRecaptchaResponse', value);
        };
        _this.handleDateChange = function (value) {
            utils_1.handleSignupInput('birthdate', value.toISOString());
        };
        _this.renderGenderButtons = function () {
            return ['male', 'female'].map(function (item, index) {
                return (React.createElement(ReusableComponents_1.Radio, { id: item, inline: true, value: item, onChange: _this.changeGender, checked: item === _this.state.genderSelected, key: index }, item.capitalize()));
            });
        };
        _this.state = { genderSelected: '' };
        return _this;
    }
    SignupForm.prototype.render = function () {
        return (React.createElement(ReusableComponents_1.Form, { horizontal: true, style: signupForm, id: this.props.id },
            React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.Col, { componentClass: ReusableComponents_1.ControlLabel, sm: 2 }, "Name"),
                React.createElement(ReusableComponents_1.Col, { sm: 5 },
                    React.createElement(ReusableComponents_1.FormControl, { id: "firstName", type: "text", placeholder: "First Name", style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleTextInputChange })),
                React.createElement(ReusableComponents_1.Col, { sm: 5 },
                    React.createElement(ReusableComponents_1.FormControl, { id: "lastName", type: "text", placeholder: "Last Name", style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleTextInputChange }))),
            React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.Col, { componentClass: ReusableComponents_1.ControlLabel, sm: 2 }, "Email"),
                React.createElement(ReusableComponents_1.Col, { sm: 10 },
                    React.createElement(ReusableComponents_1.FormControl, { id: "email", type: "email", placeholder: "Email Address", style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleTextInputChange }))),
            React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.Col, { componentClass: ReusableComponents_1.ControlLabel, sm: 2 }, "Username"),
                React.createElement(ReusableComponents_1.Col, { sm: 10 },
                    React.createElement(ReusableComponents_1.FormControl, { id: "username", type: "text", placeholder: "Username", style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleTextInputChange }))),
            React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.Col, { componentClass: ReusableComponents_1.ControlLabel, sm: 2 }, "Password"),
                React.createElement(ReusableComponents_1.Col, { sm: 10 },
                    React.createElement(ReusableComponents_1.FormControl, { id: "password", type: "password", placeholder: "Password", style: this.props.inputStyle || palette_1.defaultInputStyle, onChange: this.handleTextInputChange }))),
            React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.Col, { componentClass: ReusableComponents_1.ControlLabel, sm: 2 }, "Birthdate"),
                React.createElement(ReusableComponents_1.Col, { sm: 10 },
                    React.createElement(ReactDateTime, { id: "date", timeFormat: false, closeOnSelect: true, onChange: this.handleDateChange }))),
            React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.Col, { componentClass: ReusableComponents_1.ControlLabel, sm: 2 }, "Gender"),
                React.createElement(ReusableComponents_1.Col, { sm: 10 }, this.renderGenderButtons())),
            React.createElement(ReusableComponents_1.FormGroup, { style: palette_1.removeMarginAndPadding },
                React.createElement(ReusableComponents_1.ReCaptcha, { id: "captcha", ref: "recaptcha", sitekey: this.props.recaptchaSiteKey, onChange: this.handleCaptcha, style: reCaptchaStyle }))));
    };
    SignupForm = __decorate([
        Radium
    ], SignupForm);
    return SignupForm;
}(React.Component));
exports.SignupForm = SignupForm;
var reCaptchaStyle = {
    width: '100%',
    textAlign: '-webkit-center',
    padding: '15px',
};
var signupForm = {
    padding: '10px 0px',
};
//# sourceMappingURL=SignupForm.js.map