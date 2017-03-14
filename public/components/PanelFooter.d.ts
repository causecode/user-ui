import * as React from 'react';
import { CSS, ISubmitButton } from '../interfaces';
export interface IPanelFooterProps extends ISubmitButton {
    showOnlySubmitButton?: boolean;
    submitForm?: boolean;
    onSubmit?: React.EventHandler<React.MouseEvent>;
    otherButtonContent?: string;
    otherButtonStyle?: CSS;
    otherButtonOnClick?: React.EventHandler<React.MouseEvent>;
}
export declare class PanelFooter extends React.Component<IPanelFooterProps, void> {
    renderOtherButton: () => JSX.Element;
    render(): JSX.Element;
}
