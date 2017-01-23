import {SAVE_INPUT_VALUE} from '../constants';
import {ISignupAction} from '../interfaces';

export const saveSignupFormData = (key: string, value: string): ISignupAction => {
    return {
        type: SAVE_INPUT_VALUE,
        payload: {key, value}
    };
};
