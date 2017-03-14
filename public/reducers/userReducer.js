"use strict";
var immutable_1 = require("immutable");
var constants_1 = require("../constants");
exports.initialState = immutable_1.fromJS({
    isLoggedIn: false,
    hasLoginError: false,
    loginErrorMessage: '',
    userData: null,
    userRoles: null,
    userInstance: null,
});
exports.userReducer = function (state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case constants_1.LOGIN_SUCCESS:
            return state
                .set('isLoggedIn', true)
                .set('hasLoginError', false)
                .set('loginErrorMessage', '');
        case constants_1.SAVE_LOGGED_IN_USER_DATA:
            return state.set('userData', action.payload);
        case constants_1.CLEAR_LOGGED_IN_USER_DATA:
            return exports.initialState;
        case constants_1.SAVE_LOGIN_ERROR_MESSAGE:
            return state
                .set('hasLoginError', true)
                .set('isLoggedIn', false)
                .set('loginErrorMessage', action.payload);
        case constants_1.SAVE_BASIC_DATA:
            return state
                .set('userInstance', action.payload.userBasicData)
                .set('userRoles', action.payload.userRoles)
                .set('isLoggedIn', true);
        case constants_1.DELETE_BASIC_DATA:
            return state.set('userInstance', {}).set('isLoggedIn', false);
        default:
            return state;
    }
};
//# sourceMappingURL=userReducer.js.map