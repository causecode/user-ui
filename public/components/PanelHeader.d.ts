import * as React from 'react';
import { CSS } from '../interfaces';
export interface IPanelHeaderProps {
    headerText: string;
    headerStyle?: CSS;
}
export declare class PanelHeader extends React.Component<IPanelHeaderProps, void> {
    render(): JSX.Element;
}
