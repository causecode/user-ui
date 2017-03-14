"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Axios = require("axios");
var React = require("react");
var moment = require("moment");
var utils_1 = require("../utils");
var react_router_1 = require("react-router");
var constants_1 = require("../constants");
var signupAction_1 = require("../actions/signupAction");
var userAction_1 = require("../actions/userAction");
var react_hero_1 = require("react-hero");
var FileDownload = require('react-file-download');
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel(properties) {
        return _super.call(this, properties) || this;
    }
    UserModel.prototype.getHTMLBirthdate = function (properties) {
        var birthdate = properties.birthdate;
        var formattedDate = isNaN(Date.parse("" + birthdate)) ? '' : moment(birthdate).format('Do MMM YYYY');
        return (React.createElement("span", null, formattedDate));
    };
    UserModel.login = function (requestUrl, requestData, successUrl) {
        var _this = this;
        Axios.post("" + react_hero_1.config.serverUrl + requestUrl, requestData).then(function (response) {
            if (response.status === constants_1.HTTP_STATUS.SUCCESS) {
                var responseData = response.data;
                react_hero_1.setTokenInLocalStorage(responseData.access_token);
                utils_1.dispatchToStore(userAction_1.loginSuccess());
                _this.getUserData();
                react_router_1.browserHistory.push(successUrl);
            }
        }).catch(function (error) {
            if (error.status === constants_1.HTTP_STATUS.UNAUTHORIZED) {
                utils_1.dispatchToStore(userAction_1.saveLoginErrorMessage('Invalid Credentials'));
            }
            else {
                utils_1.dispatchToStore(userAction_1.saveLoginErrorMessage('Unable to sign in. Please try again later.'));
            }
        });
    };
    UserModel.getUserData = function () {
        react_hero_1.HTTP.getRequest('home/action/basicData')
            .then(function (response) {
            var userRoles = [];
            response.data.userRoles.forEach(function (roleId) {
                response.data.roleList.forEach(function (item) {
                    if (item.id === roleId) {
                        userRoles.push(item.authority);
                    }
                });
            });
            utils_1.dispatchToStore(userAction_1.saveBasicData(response.data.userInstance, userRoles));
        })
            .catch(function () {
            react_router_1.browserHistory.push('login');
        });
    };
    UserModel.logout = function (requestUrl) {
        Axios({
            method: 'post',
            url: "" + react_hero_1.config.serverUrl + requestUrl,
            headers: { 'X-Auth-Token': react_hero_1.getTokenFromLocalStorage() },
        }).then(function (response) {
            if (response.status === constants_1.HTTP_STATUS.SUCCESS) {
                utils_1.dispatchToStore(userAction_1.clearLoggedInUserData());
                react_router_1.browserHistory.push('');
            }
        });
    };
    UserModel.signup = function (requestUrl, requestData, successUrl) {
        utils_1.dispatchToStore(signupAction_1.updateSignupError(''));
        react_hero_1.HTTP.postRequest(requestUrl, {}, requestData).then(function (response) {
            if (response.status === constants_1.HTTP_STATUS.SUCCESS) {
                react_router_1.browserHistory.push(successUrl);
            }
        }).catch(function (error) {
            utils_1.dispatchToStore(signupAction_1.updateSignupError(error.data.message));
        });
    };
    UserModel.exportUserReport = function (selectAll, selectedIds) {
        var url = "userManagement/action/export?selectAll=" + selectAll + "&selectedIds=" + selectedIds;
        react_hero_1.HTTP.getRequest(url)
            .then(function (response) {
            FileDownload(response.data, 'userData.csv');
        })
            .catch(function () {
            react_hero_1.showAlert(constants_1.ALERT_DANGER, 'Error occured while exporting the user data.');
        });
        utils_1.toggleConfirmationModal(false);
    };
    UserModel.lockUnlockUserAccounts = function (lockAccount, selectedIds) {
        react_hero_1.HTTP.postRequest("userManagement/action/lockUnlockUserAccounts", {}, { lockAccount: lockAccount, selectedIds: selectedIds })
            .then(function (response) {
            if (response.status === constants_1.HTTP_STATUS.SUCCESS) {
                react_hero_1.showAlert(constants_1.ALERT_INFO, 'Operation performed successfully.');
            }
        })
            .catch(function () {
            react_hero_1.showAlert(constants_1.ALERT_DANGER, 'Unable to perform the operation.');
        });
        utils_1.toggleConfirmationModal(false);
    };
    UserModel.modifyRoles = function (addToExisting, userIds, roleIds) {
        var roleActionType = addToExisting ? 'append' : 'refresh';
        var url = "userManagement/action/modifyRoles";
        return react_hero_1.HTTP.postRequest(url, {}, { roleActionType: roleActionType, userIds: userIds, roleIds: roleIds });
    };
    UserModel.forgotPassword = function (url, email) {
        return react_hero_1.HTTP.postRequest(url, {}, { email: email });
    };
    UserModel.resetPassword = function (url, token, email, password, password2) {
        return react_hero_1.HTTP.postRequest(url, {}, { token: token, email: email, password: password, password2: password2 });
    };
    return UserModel;
}(react_hero_1.BaseModel));
exports.UserModel = UserModel;
UserModel.propTypes = {
    id: react_hero_1.ModelPropTypes.NUMBER,
    firstName: react_hero_1.ModelPropTypes.STRING,
    lastName: react_hero_1.ModelPropTypes.STRING,
    email: react_hero_1.ModelPropTypes.STRING,
    birthdate: react_hero_1.ModelPropTypes.DATE
};
UserModel.defaultProps = {
    firstName: '',
    lastName: '',
    email: '',
    dateCreated: '',
    birthdate: ''
};
UserModel.resourceName = 'userManagement';
UserModel.columnNames = [
    'id',
    'firstName',
    'lastName',
    'email',
    'birthdate'
];
//# sourceMappingURL=UserModel.js.map