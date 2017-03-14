import * as React from 'react';
import { CSS, validationType, ISubmitButton } from '../interfaces';
export interface IResetPasswordPanelStyleProps {
    resetPasswordContainerStyle?: CSS;
    loginButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    bodyTextStyle?: CSS;
    inputStyle?: CSS;
}
export interface IResetPasswordPanelProps extends IResetPasswordPanelStyleProps, ISubmitButton {
    paneltitle?: string;
    onSubmitUrl: string;
    successUrl?: string;
    onLoginUrl?: string;
}
export interface IResetPasswordPanelState {
    newPassword?: string;
    confirmPassword?: string;
    newPasswordError?: validationType;
    confirmPasswordError?: validationType;
    passwordChanged?: boolean;
    errorMessage?: string;
}
export declare class ResetPasswordPanel extends React.Component<IResetPasswordPanelProps, IResetPasswordPanelState> {
    constructor();
    componentWillMount: () => void;
    handleInputChange: (event: React.FormEvent) => void;
    submitForm: (event: React.FormEvent) => void;
    handleLoginButton: () => void;
    renderPanelFooter: () => JSX.Element;
    render(): JSX.Element;
}
