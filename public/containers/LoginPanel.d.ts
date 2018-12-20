/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FormControlProps } from 'react-bootstrap';
import { CSS, validationType } from '../interfaces';
export interface IMapStateToProps {
    isLoggedIn: boolean;
    errorMessage: string;
}
export interface ILoginPanelStyleProps {
    loginContainerStyle?: CSS;
    submitButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    footerLinkStyle?: CSS;
    inputStyle?: CSS;
}
export interface ILoginPanelProps extends ILoginPanelStyleProps {
    showRememberMeCheckbox?: boolean;
    submitButtonContent?: JSX.Element | string;
    emailPlaceholder?: string;
    passwordPlaceholder?: string;
    onForgotPassword: string;
    onLoginSuccess: string;
    onSignup: string;
    onSubmit: string;
    panelTitle?: string;
    isLoggedIn?: boolean;
    hasLoginError?: boolean;
    errorMessage?: string;
    getBasicUserData?: boolean;
    allowSignup?: boolean;
}
export interface ILoginPanelState {
    email?: string;
    password?: string;
    rememberMe?: boolean;
    emailError?: validationType;
    passwordError?: validationType;
}
export declare class LoginPanelImpl extends React.Component<ILoginPanelProps & RouteComponentProps<void>, ILoginPanelState> {
    constructor();
    static defaultProps: {
        allowSignup: boolean;
    };
    handleRememberCheckbox: () => void;
    handleInput: (event: React.FormEvent<React.Component<FormControlProps, {}>>) => void;
    submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
    renderPanelFooter: () => JSX.Element;
    renderRememberMeCheckbox: () => JSX.Element;
    render(): JSX.Element;
}
export declare const LoginPanel: React.ComponentClass<ILoginPanelProps>;
