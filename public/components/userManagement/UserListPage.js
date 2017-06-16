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
var react_redux_1 = require("react-redux");
var utils_1 = require("../../utils");
var ConfirmationModal_1 = require("../modals/ConfirmationModal");
var RolesModal_1 = require("../modals/RolesModal");
var react_hero_1 = require("react-hero");
var UserListPageImpl = UserListPageImpl_1 = (function (_super) {
    __extends(UserListPageImpl, _super);
    function UserListPageImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userActions = [
            { label: 'Export Report', action: utils_1.showConfirmationModal },
            { label: 'Lock account(s)', action: utils_1.showConfirmationModal },
            { label: 'Unlock account(s)', action: utils_1.showConfirmationModal },
            { label: 'Change role', action: utils_1.showConfirmationModal }
        ];
        _this.pageTitle = (React.createElement("h1", { className: "caps" }, " User Management "));
        return _this;
    }
    UserListPageImpl.prototype.render = function () {
        return (React.createElement("div", { style: listContainer },
            React.createElement(react_hero_1.AlertDismissable, { alertStyle: exports.alertStyle }),
            React.createElement(react_hero_1.PagedList, { max: 10, resource: UserListPageImpl_1.resourceName, totalCount: this.props.totalCount, userActionsMap: this.userActions, pageHeader: this.pageTitle, showDefaultActions: false },
                React.createElement(react_hero_1.DropDownFilter, { label: "Sort", paramName: "sort", possibleValues: [
                        { label: 'Id', value: 'id' },
                        { label: 'First Name', value: 'firstName' },
                        { label: 'Last Name', value: 'lastName' },
                        { label: 'Email', value: 'email' },
                        { label: 'Date Created', value: 'dateCreated' },
                        { label: 'Last Updated', value: 'lastUpdated' }
                    ] }),
                React.createElement(react_hero_1.DropDownFilter, { label: "Order", paramName: "order", possibleValues: [
                        { label: 'Ascending', value: 'asc' },
                        { label: 'Descending', value: 'desc' }
                    ] })),
            React.createElement(ConfirmationModal_1.ConfirmationModal, null),
            React.createElement(RolesModal_1.RolesModal, null)));
    };
    return UserListPageImpl;
}(React.Component));
UserListPageImpl.resourceName = 'userManagement';
UserListPageImpl = UserListPageImpl_1 = __decorate([
    Radium
], UserListPageImpl);
exports.UserListPageImpl = UserListPageImpl;
var mapStateToProps = function (state, ownProps) {
    var resourceData = state.data.get(UserListPageImpl.resourceName + "List", {});
    resourceData = resourceData.toJS ? resourceData.toJS() : resourceData;
    return {
        properties: resourceData.properties,
        instanceList: resourceData.instanceList,
        totalCount: resourceData.totalCount
    };
};
var UserListPage = react_redux_1.connect(mapStateToProps)(UserListPageImpl);
exports.UserListPage = UserListPage;
var listContainer = {
    padding: '20px',
};
exports.alertStyle = {
    margin: '57px 0px 0px 0px',
    position: 'fixed',
    width: '95%',
    textAlign: 'center',
};
var UserListPageImpl_1;
//# sourceMappingURL=UserListPage.js.map