import {IAccessOptions} from '../interfaces';

export enum HTTP_STATUS {
    SUCCESS = 200,
    UNAUTHORIZED = 401
}

// Signup action types.
export const SAVE_INPUT_VALUE: string = 'SAVE_INPUT_VALUE';
export const UPDATE_SIGNUP_ERROR_MESSAGE: string = 'UPDATE_SIGNUP_ERROR_MESSAGE';

// Modal action types.
export const TOGGLE_ROLES_LIST_MODAL: string = 'TOGGLE_ROLES_LIST_MODAL';
export const TOGGLE_CONFIRMATION_MODAL: string = 'TOGGLE_CONFIRMATION_MODAL';

// Login action types.
export const LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
export const SAVE_LOGGED_IN_USER_DATA: string = 'SAVE_LOGGED_IN_USER_DATA';
export const SAVE_LOGIN_ERROR_MESSAGE: string = 'SAVE_LOGIN_ERROR_MESSAGE';
export const CLEAR_LOGGED_IN_USER_DATA: string = 'CLEAR_LOGGED_IN_USER_DATA';

/**
 * Access token and its timestamp are saved in the local storage with these keys.
 */
export const AUTH_TOKEN_KEY: string = 'AUTH_TOKEN_KEY';
export const AUTH_TOKEN_KEY_TIMESTAMP: string = 'AUTH_TOKEN_KEY_TIMESTAMP';

export const ALERT_INFO = 'info';
export const ALERT_WARNING = 'warning';
export const ALERT_DANGER = 'danger';
export const ALERT_SUCCESS = 'success';

export const SAVE_BASIC_DATA: string = 'SAVE_BASIC_DATA';
export const DELETE_BASIC_DATA: string = 'DELETE_BASIC_DATA';

/**
 * Hardcoding the roles list because there is no end point to get all the existing roles from the server.
 */
export const rolesList: IAccessOptions[] = [
    {id: 1, authority: 'USER'},
    {id: 2, authority: 'ADMIN'},
    {id: 3, authority: 'CONTENT MANAGER'},
    {id: 4, authority: 'JOB BOARD MANAGER'},
    {id: 5, authority: 'EMPLOYEE MANAGER'},
    {id: 6, authority: 'EMPLOYEE'},
    {id: 7, authority: 'ACCELERATOR USER'},
    {id: 8, authority: 'ACCELERATOR JUDGE'},
    {id: 9, authority: 'ACCELERATOR MENTOR'},
    {id: 10, authority: 'USER RATER'},
    {id: 11, authority: 'CRM MANAGER'},
    {id: 12, authority: 'USER MANAGER'},
    {id: 13, authority: 'CRM USER'},
    {id: 14, authority: 'HR'},
];
