import * as React from 'react';
import * as Radium from 'radium';
import {defaultFooterContainer, pullLeft, pullRight} from '../constants/palette';
import {Button} from './ReusableComponents';
import {CSS, ISubmitButton} from '../interfaces';

export interface IPanelFooterProps extends ISubmitButton {
    showOnlySubmitButton?: boolean;
    submitForm?: boolean;
    onSubmit?: React.EventHandler<React.MouseEvent>;
    otherButtonContent?: string;
    otherButtonStyle?: CSS;
    otherButtonOnClick?: React.EventHandler<React.MouseEvent>;
}

@Radium
export class PanelFooter extends React.Component<IPanelFooterProps, void> {

    renderOtherButton = (): JSX.Element => {
        return (
            <div style={pullLeft}>
                <Button style={this.props.otherButtonStyle} onClick={this.props.otherButtonOnClick}>
                    {this.props.otherButtonContent}
                </Button>
            </div>
        );
    }

    render(): JSX.Element {
        let submitButtonProp: {type?: string, onClick?: React.EventHandler<React.MouseEvent>} = {};
        if (this.props.submitForm) {
            submitButtonProp.type = 'submit';
        } else {
            submitButtonProp.onClick = this.props.onSubmit;
        }

        return (
            <div style={defaultFooterContainer}>
                {!this.props.showOnlySubmitButton ? this.renderOtherButton() : null}
                <div style={pullRight}>
                    <Button style={this.props.submitButtonStyle} {...submitButtonProp}>
                        {this.props.submitButtonContent}
                    </Button>
                </div>
            </div>
        );
    }
}
