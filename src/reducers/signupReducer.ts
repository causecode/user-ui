import {SAVE_INPUT_VALUE} from '../constants';
import {ISignupAction} from '../interfaces';
import {IFromJS} from 'react-hero';
import {fromJS} from 'immutable';

export const initialState: IFromJS = fromJS({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    birthdate: '',
    gender: '',
    captcha: ''
});

export const signupReducer = (state: IFromJS = initialState, action: ISignupAction): IFromJS => {
    switch (action.type) {
        case SAVE_INPUT_VALUE:
            return state.set(action.payload.key, action.payload.value);

        default:
            return state;
    }
};
