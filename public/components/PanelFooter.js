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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var palette_1 = require("../constants/palette");
var ReusableComponents_1 = require("./ReusableComponents");
var PanelFooter = (function (_super) {
    __extends(PanelFooter, _super);
    function PanelFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderOtherButton = function () {
            return (React.createElement("div", { style: palette_1.pullLeft },
                React.createElement(ReusableComponents_1.Button, { id: "otherButton", style: _this.props.otherButtonStyle, onClick: _this.props.otherButtonOnClick }, _this.props.otherButtonContent)));
        };
        return _this;
    }
    PanelFooter.prototype.render = function () {
        var submitButtonProp = {};
        if (this.props.submitForm) {
            submitButtonProp.type = 'submit';
        }
        else {
            submitButtonProp.onClick = this.props.onSubmit;
        }
        return (React.createElement("div", { style: palette_1.defaultFooterContainer },
            !this.props.showOnlySubmitButton ? this.renderOtherButton() : null,
            React.createElement("div", { style: palette_1.pullRight },
                React.createElement(ReusableComponents_1.Button, __assign({ id: "submitButton", style: this.props.submitButtonStyle }, submitButtonProp), this.props.submitButtonContent))));
    };
    return PanelFooter;
}(React.Component));
PanelFooter = __decorate([
    Radium
], PanelFooter);
exports.PanelFooter = PanelFooter;
//# sourceMappingURL=PanelFooter.js.map