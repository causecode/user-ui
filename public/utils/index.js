"use strict";
var modalAction_1 = require("../actions/modalAction");
var signupAction_1 = require("../actions/signupAction");
var store_1 = require("../store");
var constants_1 = require("../constants");
exports.handleSignupInput = function (key, value) {
    exports.dispatchToStore(signupAction_1.saveSignupFormData(key, value));
};
exports.toggleConfirmationModal = function (visible) {
    exports.dispatchToStore(modalAction_1.changeModalVisibility(constants_1.TOGGLE_CONFIRMATION_MODAL, visible));
};
exports.toggleRolesListModal = function (visible) {
    exports.dispatchToStore(modalAction_1.changeModalVisibility(constants_1.TOGGLE_ROLES_LIST_MODAL, visible));
};
exports.dispatchToStore = function () {
    var actions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actions[_i - 0] = arguments[_i];
    }
    actions.forEach(function (action) {
        store_1.store.dispatch(action);
    });
};
exports.showConfirmationModal = function () {
    exports.toggleConfirmationModal(true);
};
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
//# sourceMappingURL=index.js.map