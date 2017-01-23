import {IFromJS} from 'react-hero';
export {CSSProperties as CSS} from 'react';

export type validationType = 'success' | 'warning' | 'error';

export interface ISignupAction {
    type: string;
    payload: {
        key: string,
        value: string
    };
}

export interface ISignupData {
    firstname?: string;
    lastname?: string;
    email: string;
    username: string;
    password?: string;
    birthdate?: string;
    gender?: string;
    captcha?: string;
}

export interface IState {
    signupData?: IFromJS;
}
