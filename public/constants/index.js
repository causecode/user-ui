"use strict";
(function (HTTP_STATUS) {
    HTTP_STATUS[HTTP_STATUS["SUCCESS"] = 200] = "SUCCESS";
    HTTP_STATUS[HTTP_STATUS["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(exports.HTTP_STATUS || (exports.HTTP_STATUS = {}));
var HTTP_STATUS = exports.HTTP_STATUS;
exports.SAVE_INPUT_VALUE = 'SAVE_INPUT_VALUE';
exports.UPDATE_SIGNUP_ERROR_MESSAGE = 'UPDATE_SIGNUP_ERROR_MESSAGE';
exports.TOGGLE_ROLES_LIST_MODAL = 'TOGGLE_ROLES_LIST_MODAL';
exports.TOGGLE_CONFIRMATION_MODAL = 'TOGGLE_CONFIRMATION_MODAL';
exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
exports.SAVE_LOGGED_IN_USER_DATA = 'SAVE_LOGGED_IN_USER_DATA';
exports.SAVE_LOGIN_ERROR_MESSAGE = 'SAVE_LOGIN_ERROR_MESSAGE';
exports.CLEAR_LOGGED_IN_USER_DATA = 'CLEAR_LOGGED_IN_USER_DATA';
exports.AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
exports.AUTH_TOKEN_KEY_TIMESTAMP = 'AUTH_TOKEN_KEY_TIMESTAMP';
exports.ALERT_INFO = 'info';
exports.ALERT_WARNING = 'warning';
exports.ALERT_DANGER = 'danger';
exports.ALERT_SUCCESS = 'success';
exports.SAVE_BASIC_DATA = 'SAVE_BASIC_DATA';
exports.DELETE_BASIC_DATA = 'DELETE_BASIC_DATA';
exports.rolesList = [
    { id: 1, value: 'USER' },
    { id: 2, value: 'ADMIN' },
    { id: 3, value: 'CONTENT MANAGER' },
    { id: 4, value: 'JOB BOARD MANAGER' },
    { id: 5, value: 'EMPLOYEE MANAGER' },
    { id: 6, value: 'EMPLOYEE' },
    { id: 7, value: 'ACCELERATOR USER' },
    { id: 8, value: 'ACCELERATOR JUDGE' },
    { id: 9, value: 'ACCELERATOR MENTOR' },
    { id: 10, value: 'USER RATER' },
    { id: 11, value: 'CRM MANAGER' },
    { id: 12, value: 'USER MANAGER' },
    { id: 13, value: 'CRM USER' },
    { id: 14, value: 'HR' },
];
//# sourceMappingURL=index.js.map