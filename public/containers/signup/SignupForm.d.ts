/// <reference types="react" />
import * as React from 'react';
import { RadioProps, FormControlProps } from 'react-bootstrap';
import { CSS } from '../../interfaces';
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
    changeGender: (event: React.FormEvent<RadioProps>) => void;
    handleTextInputChange: (event: React.FormEvent<React.Component<FormControlProps, {}>>) => void;
    handleCaptcha: (value: string) => void;
    handleDateChange: (value: {
        toISOString: () => string;
    }) => void;
    renderGenderButtons: () => JSX.Element[];
    render(): JSX.Element;
}
