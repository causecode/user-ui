"use strict";
var react_hero_1 = require("react-hero");
exports.store = react_hero_1.store;
var index_1 = require("../reducers/index");
if (react_hero_1.store.replaceReducer) {
    react_hero_1.store.replaceReducer(react_hero_1.addReducers(index_1.userManagementReducer));
}
//# sourceMappingURL=index.js.map