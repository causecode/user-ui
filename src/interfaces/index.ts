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
    myRecaptchaResponse?: string;
    signupErrorMessage?: string;
}

export interface ILoginData {
    email: string;
    password: string;
    remember_me?: boolean;
}

export interface IState {
    signupData?: IFromJS;
    currentUser?: IFromJS;
    showConfirmationModal?: boolean;
}

export interface IGenericAction {
    type: string;
    payload?: string | number; 
}

export interface IState {
    signupData?: IFromJS;
    showConfirmationModal?: boolean;
    currentUser?: IFromJS;
}

// Type `any` is intentional because response data can be anything.
export interface IAxiosResponse {
    status: number;
    access_token?: string;
    data: any;
}
