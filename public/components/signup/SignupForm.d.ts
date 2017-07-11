import * as React from 'react';
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
    changeGender: (event: React.FormEvent) => void;
    handleTextInputChange: (event: React.FormEvent) => void;
    handleCaptcha: (value: string) => void;
    handleDateChange: (value: {
        toISOString: () => string;
    }) => void;
    renderGenderButtons: () => JSX.Element[];
    render(): JSX.Element;
}
