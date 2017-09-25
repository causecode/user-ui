"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var immutable_1 = require("immutable");
exports.initialState = immutable_1.fromJS({
    confirmationModal: false,
    rolesModal: false
});
exports.modalReducer = function (state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case constants_1.TOGGLE_CONFIRMATION_MODAL:
            return state.set('confirmationModal', action.payload);
        case constants_1.TOGGLE_ROLES_LIST_MODAL:
            return state.set('rolesModal', action.payload);
        default:
            return state;
    }
};
//# sourceMappingURL=modalReducer.js.map