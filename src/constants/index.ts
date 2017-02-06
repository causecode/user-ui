export const SAVE_INPUT_VALUE: string = 'SAVE_INPUT_VALUE';
export const TOGGLE_CONFIRMATION_MODAL: string = 'TOGGLE_CONFIRMATION_MODAL';
export const TOGGLE_ROLES_LIST_MODAL: string = 'TOGGLE_ROLES_LIST_MODAL';
export const SAVE_ACCESS_TOKEN: string = 'SAVE_ACCESS_TOKEN';
export const SAVE_LOGGED_IN_USER_DATA: string = 'SAVE_LOGGED_IN_USER_DATA';
export const CLEAR_LOGGED_IN_USER_DATA: string = 'CLEAR_LOGGED_IN_USER_DATA';
export const SAVE_LOGIN_ERROR_MESSAGE: string = 'SAVE_LOGIN_ERROR_MESSAGE';
export const UPDATE_SIGNUP_ERROR_MESSAGE: string = 'UPDATE_SIGNUP_ERROR_MESSAGE';

export enum HTTP_STATUS {
    SUCCESS = 200,
    UNAUTHORIZED = 401
}

export const rolesList: {id: number, value: string}[] = [
    {id: 1, value: 'ROLE_USER'},
    {id: 2, value: 'ROLE_ADMIN'},
    {id: 3, value: 'ROLE_CONTENT_MANAGER'},
    {id: 4, value: 'ROLE_JOB_BOARD_MANAGER'},
    {id: 5, value: 'ROLE_EMPLOYEE_MANAGER'},
    {id: 6, value: 'ROLE_EMPLOYEE'},
    {id: 7, value: 'ROLE_ACCELERATOR_USER'},
    {id: 8, value: 'ROLE_ACCELERATOR_JUDGE'},
    {id: 9, value: 'ROLE_ACCELERATOR_MENTOR'},
    {id: 10, value: 'ROLE_USER_RATER'},
    {id: 11, value: 'ROLE_CRM_MANAGER'},
    {id: 12, value: 'ROLE_USER_MANAGER'},
    {id: 13, value: 'ROLE_CRM_USER'},
    {id: 14, value: 'ROLE_HR'}
];
