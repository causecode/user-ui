"use strict";
var constants_1 = require("../constants");
var immutable_1 = require("immutable");
exports.initialState = immutable_1.fromJS({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    birthdate: '',
    gender: '',
    myRecaptchaResponse: '',
    signupErrorMessage: ''
});
exports.signupReducer = function (state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case constants_1.SAVE_INPUT_VALUE:
            return state.set(action.payload.key, action.payload.value);
        case constants_1.UPDATE_SIGNUP_ERROR_MESSAGE:
            return state.set('signupErrorMessage', action.payload);
        default:
            return state;
    }
};
//# sourceMappingURL=signupReducer.js.map