import * as React from 'react';
import * as moment from 'moment';
import Axios, {AxiosPromise} from 'axios';
import {dispatchToStore, toggleConfirmationModal, setRolesInLocalStorage, removeRolesFromLocalStorage} from '../utils';
import {History} from 'history';
import {IAxiosResponse, ISignupData, ILoginData, IUserBasicData} from '../interfaces';
import {HTTP_STATUS, ALERT_DANGER, ALERT_INFO} from '../constants';
import {updateSignupError} from '../actions/signupAction';
import {
    saveLoginErrorMessage,
    loginSuccess,
    clearLoggedInUserData,
    saveBasicData,
} from '../actions/userAction';
import {
    BaseModel,
    ModelPropTypes,
    HTTP,
    setTokenInLocalStorage,
    config,
    getTokenFromLocalStorage,
    showAlert,
    removeTokenFromLocalStorage,
} from 'react-hero';

const FileDownload: any = require('js-file-download');

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateCreated?: Date;
    lastUpdated?: Date;
    birthdate?: Date;
}

export interface IUserDataResponse {
    userInstance: IUserBasicData;
    userRoles: number[];
    roleList: {id: number, authority: string}[];
}

export class UserModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER,
        firstName: ModelPropTypes.STRING,
        lastName: ModelPropTypes.STRING,
        email: ModelPropTypes.STRING,
        birthdate: ModelPropTypes.DATE,
    };

    static defaultProps = {
        firstName: '',
        lastName: '',
        email: '',
        dateCreated: '',
        birthdate: '',
    };

    static resourceName: string = 'userManagement';

    static columnNames: string[] = [
        'id',
        'firstName',
        'lastName',
        'email',
        'birthdate',
    ];

    getHTMLBirthdate(properties: IUser): JSX.Element {
        let birthdate: Date = properties.birthdate;
        let formattedDate: string = isNaN(Date.parse(`${birthdate}`)) ? '' : moment(birthdate).format('Do MMM YYYY');
        return (
            <span>{formattedDate}</span>
        );
    }

    static login(
            requestUrl: string,
            requestData: ILoginData,
            successUrl: string,
            history: History,
            getUserData: boolean = false,
    ): void {
        Axios.post(`${config.serverUrl}${requestUrl}`, requestData).then((response: IAxiosResponse): void => {
            if (response.status === HTTP_STATUS.SUCCESS) {
                let responseData: {access_token: string, roles: string[], username: string} = response.data;
                setTokenInLocalStorage(responseData.access_token);
                dispatchToStore(loginSuccess());
                if (getUserData) {
                    this.getUserData(history);
                } else {
                    dispatchToStore(saveBasicData(responseData.roles, {username: responseData.username}));
                    setRolesInLocalStorage(responseData.roles);
                }
                history.push(successUrl);
            }
        }).catch((error: IAxiosResponse): void => {
            if (error.status === HTTP_STATUS.UNAUTHORIZED) {
                dispatchToStore(saveLoginErrorMessage('Invalid Credentials'));
            } else {
                dispatchToStore(saveLoginErrorMessage('Unable to sign in. Please try again later.'));
            }
        });
    }

    static getUserData(history: History) {
        HTTP.getRequest('home/action/basicData')
            .then((response: IAxiosResponse): void => {
                let userRoles: string[] = [];
                response.data.userRoles.forEach((roleId: number): void => {
                    response.data.roleList.forEach((item: {id: number, authority: string}): void => {
                        if (item.id === roleId) {
                            userRoles.push(item.authority);
                        }
                    });
                });
                dispatchToStore(saveBasicData(userRoles, response.data.userInstance));
            })
            .catch((): void => {
                history.push('login');
            });
    }

    static logout(requestUrl: string, history: History): void {
        Axios({
            method: 'post',
            url: `${config.serverUrl}${requestUrl}`,
            headers: {'X-Auth-Token': getTokenFromLocalStorage()},
        }).then((response: IAxiosResponse): void => {
            if (response.status === HTTP_STATUS.SUCCESS) {
                dispatchToStore(clearLoggedInUserData());
                removeRolesFromLocalStorage();
                removeTokenFromLocalStorage();
                history.push('/');
            }
        });
    }

    static signup(requestUrl: string, requestData: ISignupData, successUrl: string, history: History): void {
        dispatchToStore(updateSignupError(''));
        HTTP.postRequest(requestUrl, {}, requestData).then((response: IAxiosResponse): void => {
            if (response.status === HTTP_STATUS.SUCCESS) {
                history.push(successUrl);
            }
        }).catch((error: IAxiosResponse): void => {
            dispatchToStore(updateSignupError(error.data.message));
        });
    }

    static exportUserReport(selectAll: boolean, selectedIds: string): void {
        let url: string = `userManagement/action/export?selectAll=${selectAll}&selectedIds=${selectedIds}`;
        HTTP.getRequest(url)
            .then((response: IAxiosResponse): void => {
                FileDownload(response.data, 'userData.csv');
            })
            .catch((): void => {
                showAlert(ALERT_DANGER, 'Error occured while exporting the user data.');
            });

        toggleConfirmationModal(false);
    }

    static lockUnlockUserAccounts(lockAccount: boolean, selectedIds: number[]): void {
        HTTP.postRequest(`userManagement/action/lockUnlockUserAccounts`, {}, {lockAccount, selectedIds})
            .then((response: IAxiosResponse): void => {
                if (response.status === HTTP_STATUS.SUCCESS) {
                    showAlert(ALERT_INFO, 'Operation performed successfully.');
                }
            })
            .catch((): void => {
                showAlert(ALERT_DANGER, 'Unable to perform the operation.');
            });

        toggleConfirmationModal(false);
    }

    static modifyRoles(addToExisting: boolean, userIds: number[], roleIds: string[]): AxiosPromise<{}> {
        let roleActionType: string = addToExisting ? 'append' : 'refresh';
        let url: string = `userManagement/action/modifyRoles`;
        return HTTP.postRequest(url, {}, {roleActionType, userIds, roleIds});
    }

    static forgotPassword(url: string, email: string): AxiosPromise<{}> {
        return HTTP.postRequest(url, {}, {email});
    }

    static resetPassword(
            url: string,
            token: string,
            email: string,
            password: string,
            password2: string,
    ): AxiosPromise<{}> {
        return HTTP.postRequest(url, {}, {token, email, password, password2});
    }

    constructor(properties: IUser) {
        super(properties);
    }
}
