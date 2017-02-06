import {TOGGLE_CONFIRMATION_MODAL, TOGGLE_ROLES_LIST_MODAL} from '../constants';
import {changeModalVisibility} from '../actions/modalAction';
import {saveSignupFormData} from '../actions/signupAction';
import {browserHistory} from 'react-router';
import {store} from '../store';

export const handleSignupInput = (key, value): void => {
    dispatchToStore(saveSignupFormData(key, value));
};

export const toggleConfirmationModal = (visible: boolean): void => {
    dispatchToStore(changeModalVisibility(TOGGLE_CONFIRMATION_MODAL, visible));
};

export const toggleRolesListModal = (visible: boolean) => {
    dispatchToStore(changeModalVisibility(TOGGLE_ROLES_LIST_MODAL, visible));
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
