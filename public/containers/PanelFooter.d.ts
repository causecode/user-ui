/// <reference types="react" />
import * as React from 'react';
import { ButtonProps } from 'react-bootstrap';
import { CSS, ISubmitButton } from '../interfaces';
export interface IPanelFooterProps extends ISubmitButton {
    showOnlySubmitButton?: boolean;
    submitForm?: boolean;
    onSubmit?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
    otherButtonContent?: string;
    otherButtonStyle?: CSS;
    otherButtonOnClick?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
}
export interface ISubmitButtonProps {
    type?: string;
    onClick?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
}
export declare class PanelFooter extends React.Component<IPanelFooterProps, {}> {
    renderOtherButton: () => JSX.Element;
    render(): JSX.Element;
}
