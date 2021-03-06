import {IGenericAction, IUserAction} from '../interfaces';
import {IFromJS} from 'react-hero';
import {fromJS} from 'immutable';
import {
    LOGIN_SUCCESS, 
    SAVE_LOGGED_IN_USER_DATA, 
    CLEAR_LOGGED_IN_USER_DATA, 
    SAVE_LOGIN_ERROR_MESSAGE,
    SAVE_BASIC_DATA,
    DELETE_BASIC_DATA,
} from '../constants';

export const initialState: IFromJS = fromJS({
    isLoggedIn: false,
    hasLoginError: false,
    loginErrorMessage: '',
    userData: null,
    userRoles: null,
    userInstance: null,
});

export const userReducer = (state: IFromJS = initialState, action: IUserAction): IFromJS => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return state
                    .set('isLoggedIn', true)
                    .set('hasLoginError', false)
                    .set('loginErrorMessage', '');
    
        case SAVE_LOGGED_IN_USER_DATA:
            return state.set('userData', action.payload);

        case CLEAR_LOGGED_IN_USER_DATA:
            return initialState;

        case SAVE_LOGIN_ERROR_MESSAGE:
            return state
                    .set('hasLoginError', true)
                    .set('isLoggedIn', false)
                    .set('loginErrorMessage', action.payload);

        case SAVE_BASIC_DATA:
            return state
                    .set('userInstance', action.payload.userBasicData)
                    .set('userRoles', action.payload.userRoles)
                    .set('isLoggedIn', true);

        case DELETE_BASIC_DATA:
            return state.set('userInstance', {}).set('isLoggedIn', false);

        default:
            return state;
    }
};
