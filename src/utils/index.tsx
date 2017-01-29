import * as Axios from 'axios';
import {saveAccessToken, saveLoggedInUserData, saveLoginErrorMessage} from '../actions/userAction';
import {changeConfirmationModalVisibility} from '../actions/confirmationModalAction';
import {saveSignupFormData} from '../actions/signupAction';
import {IAxiosResponse} from '../interfaces';
import {browserHistory} from 'react-router';
import {store} from '../store';
import {HTTP} from '../constants';

export const sendLoginRequest = (requestUrl: string, requestData: Object): void => {
    Axios.post(requestUrl, requestData)
            .then((response: IAxiosResponse): void => {
                if (response.status === HTTP.SUCCESS) {
                    let responseData = response.data;
                    dispatchToStore(
                            saveAccessToken(responseData.access_token), 
                            saveLoggedInUserData(responseData.roles || [], responseData.username || ''));
                }
            })
            .catch((error: IAxiosResponse): void => {
                if (error.status === HTTP.UNAUTHORIZED) {
                    dispatchToStore(saveLoginErrorMessage('Invalid Credentials'));
                } else {
                    dispatchToStore(saveLoginErrorMessage('Unable to sign in. Please try again later.'));
                }
            });
};

/**
 * Type 'Object' is intentional for 'requestData' as sendRequest() 
 * is a generic function for sending request to the server.
 */
export const sendRequest = (requestUrl: string, successUrl: string, requestData: Object): void => {
    Axios.post(requestUrl, requestData)
    .then(function (response: Axios.AxiosXHR<any>) {
        browserHistory.push(successUrl);
    });
};

export const handleSignupInput = (key, value): void => {
    dispatchToStore(saveSignupFormData(key, value));
};

export const toggleConfirmationModal = (): void => {
    dispatchToStore(changeConfirmationModalVisibility());
};

export function getParameterByName(name: string) {
    let url: string = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export function checkIfQueryParamExist() {
    let url = window.location.href;
    if (url.indexOf('?') !== -1 && url.indexOf('&') !== -1 && url.indexOf('=') !== -1) {
        return true;
    }

    return false;
};

// Type `any` is assigned because `dispatchToStore` is a generic function.
export const dispatchToStore = (...actions: any[]) => {
    actions.forEach((action: any) => {
        store.dispatch(action);
    });
};
