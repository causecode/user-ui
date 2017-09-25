/// <reference types="react" />
import * as React from 'react';
import { IFromJS } from 'react-hero';
export { CSSProperties as CSS } from 'react';
export declare type validationType = 'error';
export interface ISignupAction {
    type: string;
    payload?: {
        key: string;
        value: string;
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
export interface IGenericAction {
    type: string;
    payload?: string | number | boolean;
}
export interface IStateProps {
    signupData?: IFromJS;
    modalVisibility?: IFromJS;
    currentUser?: IFromJS;
    userAction?: {
        action: string;
        records: number;
    };
    checkbox?: {
        selectedIds: number[];
        selectAll: boolean;
    };
    data?: IFromJS;
}
export interface IAxiosResponse {
    status: number;
    access_token?: string;
    data: any;
}
export interface ILoggedinData {
    type: string;
    payload: {
        username: string;
        roles: string[];
    };
}
export interface ISubmitButton {
    submitButtonStyle?: React.CSSProperties;
    submitButtonContent?: string;
}
export interface ILoginButton {
    loginButtonStyle?: React.CSSProperties;
    loginButtonContent?: string;
    onLoginUrl?: string;
}
export interface IUserBasicData {
    id?: number;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    birthdate?: string;
}
export interface IUserAction {
    type: string;
    payload?: {
        userBasicData: IUserBasicData;
        userRoles: string[];
    };
}
export interface IAccessOptions {
    id: number;
    authority: string;
}
