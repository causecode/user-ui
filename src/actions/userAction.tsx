import {IGenericAction, ILoggedinData} from '../interfaces';
import {
    SAVE_ACCESS_TOKEN, 
    SAVE_LOGGED_IN_USER_DATA, 
    CLEAR_LOGGED_IN_USER_DATA, 
    SAVE_LOGIN_ERROR_MESSAGE
} from '../constants';

export const saveAccessToken = (token: string): IGenericAction => {
    return {
        type: SAVE_ACCESS_TOKEN,
        payload: token
    };
};

export const saveLoggedInUserData = (userRoles: string[], username: string): ILoggedinData => {
    return {
        type: SAVE_LOGGED_IN_USER_DATA,
        payload: {
            username,
            roles: userRoles
        }
    };
};

export const clearLoggedInUserData = (): IGenericAction => {
    return {
        type: CLEAR_LOGGED_IN_USER_DATA
    };
};

export const saveLoginErrorMessage = (errorMessage: string): IGenericAction => {
    return {
        type: SAVE_LOGIN_ERROR_MESSAGE,
        payload: errorMessage
    };
};
