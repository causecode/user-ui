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
var palette_1 = require("../../constants/palette");
var ReusableComponents_1 = require("../ReusableComponents");
var react_redux_1 = require("react-redux");
var utils_1 = require("../../utils");
var UserModel_1 = require("../../models/UserModel");
var constants_1 = require("../../constants");
var react_hero_1 = require("react-hero");
var RolesModalImpl = (function (_super) {
    __extends(RolesModalImpl, _super);
    function RolesModalImpl() {
        var _this = _super.call(this) || this;
        _this.updateRoles = function (event) {
            var oldRolesState = _this.state.selectedRoles;
            var newRole = event.target["id"];
            var wasCheckedBefore = oldRolesState.indexOf(newRole);
            if (wasCheckedBefore > -1) {
                oldRolesState.splice(wasCheckedBefore, 1);
            }
            else {
                oldRolesState.push(newRole);
            }
            _this.setState({ selectedRoles: oldRolesState });
        };
        _this.renderRolesChecklist = function () {
            return constants_1.rolesList.map(function (item, index) {
                return (React.createElement(ReusableComponents_1.Checkbox, { id: "" + item.id, onChange: _this.updateRoles, key: index, style: palette_1.listItem }, item.value));
            });
        };
        _this.updateExistingRoleState = function () {
            var oldValue = _this.state.addToExistingRoles;
            _this.setState({ addToExistingRoles: !oldValue });
        };
        _this.hideModal = function () {
            utils_1.toggleRolesListModal(false);
        };
        _this.handleSubmit = function () {
            UserModel_1.UserModel.modifyRoles(_this.state.addToExistingRoles, _this.props.selectedIds, _this.state.selectedRoles)
                .then(function (response) {
                if (response.status === constants_1.HTTP_STATUS.SUCCESS) {
                    react_hero_1.showAlert(constants_1.ALERT_INFO, 'Roles modified successfully.');
                }
            })
                .catch(function (error) {
                react_hero_1.showAlert(constants_1.ALERT_DANGER, 'Unable to modify roles.');
            });
            _this.hideModal();
        };
        _this.state = { selectedRoles: [], addToExistingRoles: true };
        return _this;
    }
    RolesModalImpl.prototype.render = function () {
        return (React.createElement(ReusableComponents_1.Modal, { onHide: this.hideModal, show: this.props.visibility, backdrop: "static" },
            React.createElement(ReusableComponents_1.Modal.Header, null, "Please select the roles:"),
            React.createElement(ReusableComponents_1.Modal.Body, null,
                React.createElement(ReusableComponents_1.Row, { style: palette_1.listStyle },
                    React.createElement("div", { style: palette_1.listContainer }, this.renderRolesChecklist())),
                React.createElement("hr", null),
                React.createElement(ReusableComponents_1.Row, { style: palette_1.listStyle },
                    React.createElement(ReusableComponents_1.Checkbox, { id: "addToExistingRoles", onChange: this.updateExistingRoleState, checked: this.state.addToExistingRoles }, "Add to existing roles"))),
            React.createElement(ReusableComponents_1.Modal.Footer, null,
                React.createElement(ReusableComponents_1.Button, { id: "submit", onClick: this.handleSubmit, bsStyle: "primary" }, "Submit"),
                React.createElement(ReusableComponents_1.Button, { id: "cancel", onClick: this.hideModal }, "Cancel"))));
    };
    return RolesModalImpl;
}(React.Component));
RolesModalImpl = __decorate([
    Radium
], RolesModalImpl);
exports.RolesModalImpl = RolesModalImpl;
var mapStateToProps = function (state) {
    return {
        visibility: state.modalVisibility.toJS().rolesModal,
        recordsSelected: state.userAction.records,
        selectedIds: state.checkbox.selectedIds,
        selectAll: state.checkbox.selectAll
    };
};
var RolesModal = react_redux_1.connect(mapStateToProps)(RolesModalImpl);
exports.RolesModal = RolesModal;
//# sourceMappingURL=RolesModal.js.map