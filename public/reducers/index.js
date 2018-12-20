"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modalReducer_1 = require("./modalReducer");
var signupReducer_1 = require("./signupReducer");
var userReducer_1 = require("./userReducer");
exports.userManagementReducer = {
    signupData: signupReducer_1.signupReducer,
    modalVisibility: modalReducer_1.modalReducer,
    currentUser: userReducer_1.userReducer,
};
//# sourceMappingURL=index.js.map