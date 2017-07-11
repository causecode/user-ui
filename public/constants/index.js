"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP_STATUS;
(function (HTTP_STATUS) {
    HTTP_STATUS[HTTP_STATUS["SUCCESS"] = 200] = "SUCCESS";
    HTTP_STATUS[HTTP_STATUS["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(HTTP_STATUS = exports.HTTP_STATUS || (exports.HTTP_STATUS = {}));
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
    { id: 1, authority: 'USER' },
    { id: 2, authority: 'ADMIN' },
    { id: 3, authority: 'CONTENT MANAGER' },
    { id: 4, authority: 'JOB BOARD MANAGER' },
    { id: 5, authority: 'EMPLOYEE MANAGER' },
    { id: 6, authority: 'EMPLOYEE' },
    { id: 7, authority: 'ACCELERATOR USER' },
    { id: 8, authority: 'ACCELERATOR JUDGE' },
    { id: 9, authority: 'ACCELERATOR MENTOR' },
    { id: 10, authority: 'USER RATER' },
    { id: 11, authority: 'CRM MANAGER' },
    { id: 12, authority: 'USER MANAGER' },
    { id: 13, authority: 'CRM USER' },
    { id: 14, authority: 'HR' },
];
//# sourceMappingURL=index.js.map