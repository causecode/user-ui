import {SAVE_INPUT_VALUE, UPDATE_SIGNUP_ERROR_MESSAGE} from '../constants';
import {ISignupAction, IGenericAction} from '../interfaces';

export const saveSignupFormData = (key: string, value: string): ISignupAction => {
    return {
        type: SAVE_INPUT_VALUE,
        payload: {key, value}
    };
};

export const updateSignupError = (payload: string): IGenericAction => {
    return {
        type: UPDATE_SIGNUP_ERROR_MESSAGE,
        payload
    };
};
