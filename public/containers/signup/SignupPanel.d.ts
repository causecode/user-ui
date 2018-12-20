/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { CSS, ISignupData, ISubmitButton, ILoginButton } from '../../interfaces';
export interface ISignupPanelStyleProps {
    inputStyle?: CSS;
    signupContainerStyle?: CSS;
    panelTitleStyle?: CSS;
    signupOptionsButtonStyle?: CSS;
}
export interface ISignupPanelProps extends ISignupPanelStyleProps, ISubmitButton, ILoginButton {
    panelTitle?: string;
    onSubmitUrl: string;
    onLoginUrl: string;
    onSuccess: string;
    userData?: ISignupData;
    recaptchaSiteKey: string;
}
export interface ISignupPanelState {
    displaySignupForm?: boolean;
}
export declare class SignupPanelImpl extends React.Component<ISignupPanelProps & RouteComponentProps<void>, ISignupPanelState> {
    constructor();
    submitForm: () => void;
    showSignupForm: () => void;
    handleLoginButton: () => void;
    renderPanelFooter: () => JSX.Element;
    renderSignupForm: () => JSX.Element;
    showSignupOptions: () => JSX.Element;
    render(): JSX.Element;
}
declare let SignupPanel: React.ComponentClass<ISignupPanelProps>;
export { SignupPanel };
