import {IGenericAction} from '../interfaces';
import {IFromJS} from 'react-hero';
import {fromJS} from 'immutable';
import {
        SAVE_ACCESS_TOKEN, 
        SAVE_LOGGED_IN_USER_DATA, 
        CLEAR_LOGGED_IN_USER_DATA, 
        SAVE_LOGIN_ERROR_MESSAGE
} from '../constants';

export const initialState: IFromJS = fromJS({
    accessToken: '',
    isLoggedIn: false,
    hasLoginError: false,
    loginErrorMessage: '',
    userData: null
});

export const userReducer = (state: IFromJS = initialState, action: IGenericAction): IFromJS => {
    switch (action.type) {
        case SAVE_ACCESS_TOKEN:
            return state
                    .set('accessToken', action.payload)
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

        default:
            return state;
    }
};
