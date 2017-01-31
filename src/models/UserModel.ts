import * as Axios from 'axios';
import {saveAccessToken, saveLoggedInUserData, saveLoginErrorMessage} from '../actions/userAction';
import {BaseModel, ModelPropTypes, config} from 'react-hero';
import {dispatchToStore} from '../utils';
import {IAxiosResponse, ISignupData, ILoginData} from '../interfaces';
import {browserHistory} from 'react-router';
import {HTTP_STATUS} from '../constants';
import {updateSignupError} from '../actions/signupAction';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateCreated: Date;
    lastUpdated: Date;
}

export class UserModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER,
        firstName: ModelPropTypes.STRING,
        lastName: ModelPropTypes.STRING,
        email: ModelPropTypes.STRING,
        dateCreated: ModelPropTypes.DATE,
        lastUpdated: ModelPropTypes.DATE,
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
        'firstName',
        'lastName',
        'email',
        'dateCreated',
        'lastUpdated'
    ];

    static login(requestUrl: string, requestData: ILoginData, successUrl: string): void {
        Axios.post(requestUrl, requestData).then((response: IAxiosResponse): void => {
            if (response.status === HTTP_STATUS.SUCCESS) {
                let responseData: {access_token: string, roles: string[], username: string} = response.data;
                dispatchToStore(
                        saveAccessToken(responseData.access_token), 
                        saveLoggedInUserData(responseData.roles || [], responseData.username || ''));
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
        Axios.post(requestUrl, requestData).then((response: IAxiosResponse): void => {
            if (response.status === HTTP_STATUS.SUCCESS) {
                let responseData: {access_token: string, user: {email: string}} = response.data;
                UserModel.registerUser(`register/action/registerEmployee`, responseData.user.email, successUrl);
            }
        }).catch((error: IAxiosResponse): void => {
            dispatchToStore(updateSignupError(error.data.message));
        });
    }

    static registerUser(requestUrl: string, requestData: string, successUrl: string) {
        dispatchToStore(updateSignupError(''));
        Axios.post(`${config.APIUrl}${requestUrl}`, {email: requestData}).then((response: IAxiosResponse): void => {
            browserHistory.push(successUrl);
        }).catch((error: IAxiosResponse): void => {
            dispatchToStore(updateSignupError(error.data.message));
        });
    }

    constructor(properties: IUser) {
        super(properties);
    }
}
