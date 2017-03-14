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
var ErrorMessage = (function (_super) {
    __extends(ErrorMessage, _super);
    function ErrorMessage() {
        return _super.apply(this, arguments) || this;
    }
    ErrorMessage.prototype.render = function () {
        return (React.createElement("div", { style: exports.errorMessage }, this.props.message || ''));
    };
    return ErrorMessage;
}(React.Component));
ErrorMessage = __decorate([
    Radium
], ErrorMessage);
exports.ErrorMessage = ErrorMessage;
exports.errorMessage = {
    marginBotton: '10px',
    textAlign: 'center',
    color: '#FB540C'
};
//# sourceMappingURL=ErrorMessage.js.map