import {SAVE_INPUT_VALUE, UPDATE_SIGNUP_ERROR_MESSAGE} from '../constants';
import {ISignupAction} from '../interfaces';
import {IFromJS} from 'react-hero';
import {fromJS} from 'immutable';

export const initialState: IFromJS = fromJS({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    birthdate: '',
    gender: '',
    myRecaptchaResponse: '',
    signupErrorMessage: '',
});

export const signupReducer = (state: IFromJS = initialState, action: ISignupAction): IFromJS => {
    switch (action.type) {
        case SAVE_INPUT_VALUE:
            return state.set(action.payload.key, action.payload.value);

        case UPDATE_SIGNUP_ERROR_MESSAGE:
            return state.set('signupErrorMessage', action.payload);

        default:
            return state;
    }
};
