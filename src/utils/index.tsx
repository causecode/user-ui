import * as Axios from 'axios';
import {changeConfirmationModalVisibility, changeRolesListModalVisibility} from '../actions/modalAction';
import {saveSignupFormData} from '../actions/signupAction';
import {browserHistory} from 'react-router';
import {store} from '../store';

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

export const toggleConfirmationModal = (visible: boolean): void => {
    dispatchToStore(changeConfirmationModalVisibility(visible));
};

export const toggleRolesListModal = (visible: boolean) => {
    dispatchToStore(changeRolesListModalVisibility(visible));
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
export const dispatchToStore = (...actions: any[]): void => {
    actions.forEach((action: any) => {
        store.dispatch(action);
    });
};

export const getDefaultHeaders = (): {'X-Auth-Token': string, 'Content-Type': string} => {
    let accessToken: string = store.getState().currentUser.get('accessToken');
    if (!accessToken) {
        console.error('Access Token not found. Redirecting to the Home Page');
        browserHistory.push('');
    }
    
    return {
        'X-Auth-Token': accessToken,
        'Content-Type': 'application/json'
    };
};

export const showConfirmationModal = (): void => {
    toggleConfirmationModal(true);
};
