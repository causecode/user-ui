import {changeModalVisibility} from '../actions/modalAction';
import {saveSignupFormData} from '../actions/signupAction';
import {browserHistory} from 'react-router';
import {store} from '../store';
import {
    TOGGLE_CONFIRMATION_MODAL,
    TOGGLE_ROLES_LIST_MODAL,
    AUTH_TOKEN_KEY,
    AUTH_TOKEN_KEY_TIMESTAMP
} from '../constants';

export const handleSignupInput = (key: string, value: string): void => {
    dispatchToStore(saveSignupFormData(key, value));
};

export const toggleConfirmationModal = (visible: boolean): void => {
    dispatchToStore(changeModalVisibility(TOGGLE_CONFIRMATION_MODAL, visible));
};

export const toggleRolesListModal = (visible: boolean): void => {
    dispatchToStore(changeModalVisibility(TOGGLE_ROLES_LIST_MODAL, visible));
};

// Type `any` is assigned because `dispatchToStore` is a generic function.
export const dispatchToStore = (...actions: any[]): void => {
    actions.forEach((action: any) => {
        store.dispatch(action);
    });
};

export const getDefaultHeaders = (): {'X-Auth-Token': string, 'Content-Type': string} => {
    let accessToken: string = getTokenFromLocalStorage();
    if (!accessToken) {
        console.warn('Access Token not found. Redirecting to the Home Page');
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

export const setTokenInLocalStorage = (token: string) => {
    if (!token) {
        console.warn('No Token sent to setTokenInLocalStorage');
        return;
    }

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_TOKEN_KEY_TIMESTAMP, new Date().toString());
};

export const getTokenFromLocalStorage = (): string => {
    let token: string = localStorage.getItem(AUTH_TOKEN_KEY);
    let tokenCreationDate: Date = new Date(localStorage.getItem(AUTH_TOKEN_KEY_TIMESTAMP));
    let tokenAgeInDays: number = Math.abs(new Date().getDate() - tokenCreationDate.getDate());

    if (!token || tokenAgeInDays > 60) {
        return '';
    }

    return token;
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
