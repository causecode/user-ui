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
var react_hero_1 = require("react-hero");
var ReusableComponents_1 = require("../ReusableComponents");
var store_1 = require("../../store");
var react_router_1 = require("react-router");
var UserEditPage = (function (_super) {
    __extends(UserEditPage, _super);
    function UserEditPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.fetchStoreInstance = function () {
            var instance = _this.props.instance;
            var instanceKey = instance.resourceName + "Edit";
            if (store_1.store.getState() && store_1.store.getState().forms) {
                instance.properties = store_1.store.getState().forms["rhForms"][instanceKey].properties;
            }
            return instance;
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.handleSubmit(_this.fetchStoreInstance());
        };
        return _this;
    }
    UserEditPage.prototype.render = function () {
        return (React.createElement("div", { style: this.props.formContainerStyle },
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement(ReusableComponents_1.Grid, { style: this.props.gridStyle },
                    React.createElement(react_hero_1.FormInput, { type: "text", propertyName: "First Name", model: "rhForms.userManagementEdit.properties.firstname" }),
                    React.createElement(react_hero_1.FormInput, { type: "text", propertyName: "Last Name", model: "rhForms.userManagementEdit.properties.lastname" }),
                    React.createElement(react_hero_1.FormInput, { type: "date", propertyName: "Date of birth", model: "rhForms.userManagementEdit.properties.birthdate" }),
                    React.createElement(ReusableComponents_1.FormGroup, null,
                        React.createElement(ReusableComponents_1.Col, { sm: 4, smOffset: 3 },
                            React.createElement(ReusableComponents_1.Button, { style: this.props.submitButtonStyle || defaultButtonStyles, bsStyle: "primary", type: "submit" }, "Update"),
                            React.createElement(react_router_1.Link, { style: this.props.cancelButtonStyle || defaultButtonStyles, className: "btn btn-default", to: '/userManagement/list' }, "Cancel")))))));
    };
    return UserEditPage;
}(React.Component));
UserEditPage.resourceName = 'userManagement';
UserEditPage = __decorate([
    Radium
], UserEditPage);
exports.UserEditPage = UserEditPage;
;
var defaultButtonStyles = {
    margin: '0px 10px'
};
//# sourceMappingURL=UserEditPage.js.map