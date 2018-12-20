"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
exports.saveSignupFormData = function (key, value) {
    return {
        type: constants_1.SAVE_INPUT_VALUE,
        payload: { key: key, value: value },
    };
};
exports.updateSignupError = function (payload) {
    return {
        type: constants_1.UPDATE_SIGNUP_ERROR_MESSAGE,
        payload: payload,
    };
};
//# sourceMappingURL=signupAction.js.map