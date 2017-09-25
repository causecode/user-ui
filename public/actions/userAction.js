"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
exports.loginSuccess = function () {
    return {
        type: constants_1.LOGIN_SUCCESS
    };
};
exports.saveLoggedInUserData = function (userRoles, username) {
    return {
        type: constants_1.SAVE_LOGGED_IN_USER_DATA,
        payload: {
            username: username,
            roles: userRoles
        }
    };
};
exports.clearLoggedInUserData = function () {
    return {
        type: constants_1.CLEAR_LOGGED_IN_USER_DATA
    };
};
exports.saveLoginErrorMessage = function (errorMessage) {
    return {
        type: constants_1.SAVE_LOGIN_ERROR_MESSAGE,
        payload: errorMessage
    };
};
exports.saveBasicData = function (userRoles, userBasicData) {
    return {
        type: constants_1.SAVE_BASIC_DATA,
        payload: {
            userBasicData: userBasicData,
            userRoles: userRoles,
        },
    };
};
exports.deleteBasicData = function () {
    return {
        type: constants_1.DELETE_BASIC_DATA,
    };
};
//# sourceMappingURL=userAction.js.map