import {IGenericAction, ILoggedinData, IUserBasicData, IUserAction} from '../interfaces';
import {
    LOGIN_SUCCESS,
    SAVE_LOGGED_IN_USER_DATA,
    CLEAR_LOGGED_IN_USER_DATA,
    SAVE_LOGIN_ERROR_MESSAGE,
    SAVE_BASIC_DATA,
    DELETE_BASIC_DATA,
} from '../constants';

export const loginSuccess = (): IGenericAction => {
    return {
        type: LOGIN_SUCCESS,
    };
};

export const saveLoggedInUserData = (userRoles: string[], username: string): ILoggedinData => {
    return {
        type: SAVE_LOGGED_IN_USER_DATA,
        payload: {
            username,
            roles: userRoles,
        },
    };
};

export const clearLoggedInUserData = (): IGenericAction => {
    return {
        type: CLEAR_LOGGED_IN_USER_DATA,
    };
};

export const saveLoginErrorMessage = (errorMessage: string): IGenericAction => {
    return {
        type: SAVE_LOGIN_ERROR_MESSAGE,
        payload: errorMessage,
    };
};

export const saveBasicData = (userRoles: string[], userBasicData: IUserBasicData): IUserAction => {
    return {
        type: SAVE_BASIC_DATA,
        payload: {
            userBasicData,
            userRoles,
        },
    };
};

export const deleteBasicData = (): IUserAction => {
    return {
        type: DELETE_BASIC_DATA,
    };
};
