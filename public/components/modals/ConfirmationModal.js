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
var ReusableComponents_1 = require("../ReusableComponents");
var react_redux_1 = require("react-redux");
var utils_1 = require("../../utils");
var UserModel_1 = require("../../models/UserModel");
var FontAwesome = require("react-fontawesome");
var ConfirmationModalImpl = (function (_super) {
    __extends(ConfirmationModalImpl, _super);
    function ConfirmationModalImpl() {
        var _this = _super.apply(this, arguments) || this;
        _this.handleAction = function (event) {
            var selectedIds = _this.props.selectedIds ? _this.props.selectedIds.join(',') : '';
            switch (_this.props.actionName) {
                case 'Export Report':
                    UserModel_1.UserModel.exportUserReport(_this.props.selectAll, selectedIds);
                    break;
                case 'Lock account(s)':
                    UserModel_1.UserModel.lockUnlockUserAccounts(true, _this.props.selectedIds || []);
                    break;
                case 'Unlock account(s)':
                    UserModel_1.UserModel.lockUnlockUserAccounts(false, _this.props.selectedIds || []);
                    break;
                case 'Change role':
                    _this.hideModal();
                    utils_1.toggleRolesListModal(true);
                    break;
                default:
                    _this.hideModal();
            }
        };
        _this.hideModal = function () {
            utils_1.toggleConfirmationModal(false);
        };
        return _this;
    }
    ConfirmationModalImpl.prototype.render = function () {
        return (React.createElement(ReusableComponents_1.Modal, { onHide: this.hideModal, show: this.props.visibility, backdrop: "static" },
            React.createElement(ReusableComponents_1.Modal.Body, null,
                React.createElement(ReusableComponents_1.Row, null,
                    React.createElement(ReusableComponents_1.Col, { sm: 3, style: modalIcon },
                        React.createElement(FontAwesome, { name: "question-circle", size: "3x" })),
                    React.createElement(ReusableComponents_1.Col, { sm: 9 },
                        React.createElement("strong", null,
                            "Are you sure you want to perform this action:",
                            React.createElement("br", null),
                            this.props.actionName,
                            " on ",
                            this.props.recordsSelected,
                            " records ?")))),
            React.createElement(ReusableComponents_1.Modal.Footer, null,
                React.createElement(ReusableComponents_1.Button, { id: "ok", onClick: this.handleAction, bsStyle: "primary" }, "OK"),
                React.createElement(ReusableComponents_1.Button, { id: "cancel", onClick: this.hideModal }, "Cancel"))));
    };
    return ConfirmationModalImpl;
}(React.Component));
ConfirmationModalImpl = __decorate([
    Radium
], ConfirmationModalImpl);
exports.ConfirmationModalImpl = ConfirmationModalImpl;
var mapStateToProps = function (state) {
    return {
        visibility: state.modalVisibility.toJS().confirmationModal,
        actionName: state.userAction.action,
        recordsSelected: state.userAction.records,
        selectedIds: state.checkbox.selectedIds,
        selectAll: state.checkbox.selectAll
    };
};
var ConfirmationModal = react_redux_1.connect(mapStateToProps)(ConfirmationModalImpl);
exports.ConfirmationModal = ConfirmationModal;
var modalIcon = {
    textAlign: 'center'
};
//# sourceMappingURL=ConfirmationModal.js.map