/// <reference types="react" />
/// <reference types="react-bootstrap" />
import * as React from 'react';
import { CSS } from '../../interfaces';
import { Radio as BootstrapRadio, FormControlProps } from 'react-bootstrap';
export interface ISignupFormState {
    genderSelected?: string;
}
export interface ISignupFormProps {
    id?: string;
    recaptchaSiteKey: string;
    inputStyle?: CSS;
}
export declare class SignupForm extends React.Component<ISignupFormProps, ISignupFormState> {
    constructor();
    changeGender: (event: React.FormEvent<BootstrapRadio>) => void;
    handleTextInputChange: (event: React.FormEvent<React.Component<FormControlProps, {}>>) => void;
    handleCaptcha: (value: string) => void;
    handleDateChange: (value: {
        toISOString: () => string;
    }) => void;
    renderGenderButtons: () => JSX.Element[];
    render(): JSX.Element;
}
