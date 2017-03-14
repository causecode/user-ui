import * as React from 'react';
import { CSS, validationType, ILoginButton, ISubmitButton } from '../interfaces';
export interface IForgotPasswordPanelStyleProps {
    forgotPasswordContainerStyle?: CSS;
    tryAgainLinkStyle?: CSS;
    panelTitleStyle?: CSS;
    bodyTextStyle?: CSS;
    inputStyle?: CSS;
}
export interface IForgotPasswordPanelProps extends IForgotPasswordPanelStyleProps, ILoginButton, ISubmitButton {
    usernamePlaceholder?: string;
    panelTitle?: string;
    onSubmitUrl: string;
    bodyText?: string;
}
export interface IForgotPasswordPanelState {
    showInputField?: boolean;
    usernameError?: validationType;
    errorMessage?: string;
    email?: string;
}
export declare class ForgotPasswordPanel extends React.Component<IForgotPasswordPanelProps, IForgotPasswordPanelState> {
    constructor();
    handleEmail: (event: React.FormEvent) => void;
    submitForm: (event: React.FormEvent) => void;
    handleLoginButton: () => void;
    renderSuccessMessage: () => JSX.Element;
    renderInputField: () => JSX.Element;
    resetState: () => void;
    renderFooter: () => JSX.Element;
    render(): JSX.Element;
}
