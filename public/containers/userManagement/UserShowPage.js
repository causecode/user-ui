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
var moment = require("moment");
var Radium = require("radium");
var ReusableComponents_1 = require("../ReusableComponents");
var palette_1 = require("../../constants/palette");
var UserShowPage = (function (_super) {
    __extends(UserShowPage, _super);
    function UserShowPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserShowPage.prototype.render = function () {
        var instance = this.props.instance;
        return (React.createElement(ReusableComponents_1.Table, { style: palette_1.defaultTableStyle, striped: true, bordered: true, condensed: true, hover: true },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Property"),
                    React.createElement("th", null, "Value"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("strong", null, "Email")),
                    React.createElement("td", null, instance.properties.email)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("strong", null, "Username")),
                    React.createElement("td", null, instance.properties.username)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("strong", null, "First Name")),
                    React.createElement("td", null, instance.properties.firstName)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("strong", null, "Last Name")),
                    React.createElement("td", null, instance.properties.lastName)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("strong", null, "Gender")),
                    React.createElement("td", null, instance.properties.gender)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("strong", null, "Date of Birth")),
                    React.createElement("td", null, moment(instance.properties.birthdate).format('MM-DD-YYYY'))))));
    };
    UserShowPage.resourceName = 'userManagement';
    UserShowPage = __decorate([
        Radium
    ], UserShowPage);
    return UserShowPage;
}(React.Component));
exports.UserShowPage = UserShowPage;
//# sourceMappingURL=UserShowPage.js.map