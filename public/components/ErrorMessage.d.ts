/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../interfaces';
export interface IErrorMessageProps {
    message?: string;
}
export declare class ErrorMessage extends React.Component<IErrorMessageProps, void> {
    render(): JSX.Element;
}
export declare const errorMessage: CSS;
