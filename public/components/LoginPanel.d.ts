import * as React from 'react';
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
export declare class LoginPanelImpl extends React.Component<ILoginPanelProps, ILoginPanelState> {
    constructor();
    static defaultProps: {
        allowSignup: boolean;
    };
    handleRememberCheckbox: () => void;
    handleInput: (event: React.FormEvent) => void;
    submitForm: (event: React.FormEvent) => void;
    renderPanelFooter: () => JSX.Element;
    renderRememberMeCheckbox: () => JSX.Element;
    render(): JSX.Element;
}
declare let LoginPanel: React.ComponentClass<ILoginPanelProps>;
export { LoginPanel };
