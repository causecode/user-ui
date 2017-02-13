import * as Axios from 'axios';
import {saveLoggedInUserData, saveLoginErrorMessage, loginSuccess} from '../actions/userAction';
import {BaseModel, ModelPropTypes, HTTP} from 'react-hero';
import {dispatchToStore, getDefaultHeaders, toggleConfirmationModal, setTokenInLocalStorage} from '../utils';
import {IAxiosResponse, ISignupData, ILoginData} from '../interfaces';
import {browserHistory} from 'react-router';
import {HTTP_STATUS} from '../constants';
import {updateSignupError} from '../actions/signupAction';

const FileDownload: any = require('react-file-download');

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateCreated?: Date;
    lastUpdated?: Date;
    birthdate?: Date;
}

export class UserModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER,
        firstName: ModelPropTypes.STRING,
        lastName: ModelPropTypes.STRING,
        email: ModelPropTypes.STRING,
        birthdate: ModelPropTypes.DATE
    };

    static defaultProps = {
        firstName: '',
        lastName: '',
        email: '',
        dateCreated: '',
        birthdate: ''
    };

    static resourceName: string = 'userManagement';

    static columnNames: string[] = [
        'id',
        'firstName',
        'lastName',
        'email',
        'birthdate'
    ];

    static login(requestUrl: string, requestData: ILoginData, successUrl: string): void {
        Axios.post(requestUrl, requestData).then((response: IAxiosResponse): void => {
            if (response.status === HTTP_STATUS.SUCCESS) {
                let responseData: {access_token: string, roles: string[], username: string} = response.data;
                setTokenInLocalStorage(responseData.access_token);
                dispatchToStore(
                        saveLoggedInUserData(responseData.roles || [], responseData.username || ''),
                        loginSuccess()
                );
                browserHistory.push(successUrl);
            }
        }).catch((error: IAxiosResponse): void => {
            if (error.status === HTTP_STATUS.UNAUTHORIZED) {
                dispatchToStore(saveLoginErrorMessage('Invalid Credentials'));
            } else {
                dispatchToStore(saveLoginErrorMessage('Unable to sign in. Please try again later.'));
            }
        });
    }

    static signup(requestUrl: string, requestData: ISignupData, successUrl: string): void {
        dispatchToStore(updateSignupError(''));
        HTTP.postRequest(requestUrl, requestData).then((response: IAxiosResponse): void => {
            if (response.status === HTTP_STATUS.SUCCESS) {
                let responseData: {access_token: string, user: {email: string}} = response.data;
                UserModel.registerUser(`register/action/registerEmployee`, responseData.user.email, successUrl);
            }
        }).catch((error: IAxiosResponse): void => {
            dispatchToStore(updateSignupError(error.data.message));
        });
    }

    static registerUser(requestUrl: string, requestData: string, successUrl: string): void {
        dispatchToStore(updateSignupError(''));
        HTTP.postRequest(`${requestUrl}`, {email: requestData}).then((response: IAxiosResponse): void => {
            browserHistory.push(successUrl);
        }).catch((error: IAxiosResponse): void => {
            dispatchToStore(updateSignupError(error.data.message));
        });
    }

    static exportUserReport(selectAll: boolean, selectedIds: string): void {
        let url: string = `userManagement/action/export?selectAll=${selectAll}&selectedIds=${selectedIds}`;
        HTTP.getRequest(url, getDefaultHeaders()).then((response: IAxiosResponse): void => {
            FileDownload(response.data, 'userData.csv');
            toggleConfirmationModal(false);
        });
    }

    static lockUnlockUserAccounts(lockAccount: boolean, selectedIds: string): void {
        HTTP.getRequest(
                `userManagement/action/lockUnlockUserAccounts?lockAccount=${lockAccount}&selectedIds=${selectedIds}`,
                getDefaultHeaders());
        toggleConfirmationModal(false);
    }

    static modifyRoles(addToExisting: boolean, userIds: number[], roleIds: string[]): Axios.IPromise<IAxiosResponse> {
        let roleActionType: string = addToExisting ? 'append' : 'refresh';
        let url: string = `userManagement/action/modifyRoles`;
        return HTTP.postRequest(url, getDefaultHeaders(), {roleActionType, userIds, roleIds});
    }

    static forgotPassword(url: string, email: string): Axios.IPromise<IAxiosResponse> {
        return HTTP.postRequest(url, {}, {email});
    }

    static resetPassword(url: string, token: string, email: string): Axios.IPromise<IAxiosResponse> {
        return HTTP.postRequest(url, {}, {token, email});
    }

    constructor(properties: IUser) {
        super(properties);
    }
}
