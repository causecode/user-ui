import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../interfaces';

export interface IPanelHeaderProps {
    headerText: string;
    headerStyle?: CSS;
}

@Radium
export class PanelHeader extends React.Component<IPanelHeaderProps, void> {

    render(): JSX.Element {
        return (
            <div style={this.props.headerStyle}>
                {this.props.headerText}
            </div>
        );
    }
}
