import * as React from 'react';
import * as Radium from 'radium';
import {defaultFooterContainer, pullLeft, pullRight} from '../constants/palette';
import {Button} from './ReusableComponents';
import {CSS, ISubmitButton} from '../interfaces';
import {ButtonProps} from 'react-bootstrap';

export interface IPanelFooterProps extends ISubmitButton {
    showOnlySubmitButton?: boolean;
    submitForm?: boolean;
    onSubmit?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
    otherButtonContent?: string;
    otherButtonStyle?: CSS;
    otherButtonOnClick?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
}

@Radium
export class PanelFooter extends React.Component<IPanelFooterProps, void> {

    renderOtherButton = (): JSX.Element => {
        return (
            <div style={pullLeft}>
                <Button id="otherButton" style={this.props.otherButtonStyle} onClick={this.props.otherButtonOnClick}>
                    {this.props.otherButtonContent}
                </Button>
            </div>
        );
    }

    render(): JSX.Element {
        let submitButtonProp: {
            type?: string,
            onClick?: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>
        } = {};
        
        if (this.props.submitForm) {
            submitButtonProp.type = 'submit';
        } else {
            submitButtonProp.onClick = this.props.onSubmit;
        }

        return (
            <div style={defaultFooterContainer}>
                {!this.props.showOnlySubmitButton ? this.renderOtherButton() : null}
                <div style={pullRight}>
                    <Button id="submitButton" style={this.props.submitButtonStyle} {...submitButtonProp}>
                        {this.props.submitButtonContent}
                    </Button>
                </div>
            </div>
        );
    }
}
