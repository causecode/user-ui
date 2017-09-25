/// <reference types="react" />
/// <reference types="react-bootstrap" />
import * as React from 'react';
import { CSS, ISubmitButton } from '../interfaces';
import { ButtonProps } from 'react-bootstrap';
export interface IPanelFooterProps extends ISubmitButton {
    showOnlySubmitButton?: boolean;
    submitForm?: boolean;
    onSubmit?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
    otherButtonContent?: string;
    otherButtonStyle?: CSS;
    otherButtonOnClick?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
}
export declare class PanelFooter extends React.Component<IPanelFooterProps, void> {
    renderOtherButton: () => JSX.Element;
    render(): JSX.Element;
}
