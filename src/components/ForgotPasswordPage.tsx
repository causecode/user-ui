import * as React from 'react';
import * as Radium from 'radium';
import * as Axios from 'axios';
import {Panel, FormControl, Button, FormGroup, HelpBlock} from './ReusableComponents';
import {CSS, validationType, IAxiosResponse} from '../interfaces';
import {
    removeMarginAndPadding, 
    defaultFooterContainer,
    defaultPanelContainer,
    defaultInputStyle,
    errorMessage,
    pullRight,
    pullLeft
} from '../constants/palette';

export interface IForgotPasswordPageStyleProps {
    forgotPasswordContainerStyle?: CSS;
    submitButtonStyle?: CSS;
    tryAgainLinkStyle?: CSS;
    loginButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    bodyTextStyle?: CSS;
    inputStyle?: CSS;
}

export interface IForgotPasswordPageProps extends IForgotPasswordPageStyleProps {
    usernamePlaceholder?: string;
    submitButtonText?: string;
    loginButtonText?: string;
    paneltitle?: string;
    onSubmitUrl: string;
    successUrl: string;
    bodyText?: string;
}

export interface IForgotPasswordStates {
    showInputField?: boolean;
    usernameError?: validationType;
    errorMessage?: string;
    email?: string;
}

@Radium
export class ForgotPasswordPage extends React.Component<IForgotPasswordPageProps, IForgotPasswordStates> {

    constructor() {
        super();
        this.state = {
            email: '', 
            usernameError: null, 
            errorMessage: '',
            showInputField: true
        };
    }

    handleEmail = (event: React.FormEvent): void => {
        let value: string = event.target[`value`];
        if (value) {
            this.setState({email: value, usernameError: null});
        }
    }

    submitForm = (event: React.FormEvent): void => {
        event.preventDefault();
        let email: string = this.state.email;
        if (!email) {
            this.setState({usernameError: 'error'});
        } else {
            Axios.post(this.props.onSubmitUrl, {email}).then((response: IAxiosResponse): void => {
                this.setState({showInputField: false, errorMessage: ''});
            }).catch((error: {data: {message: string}}) => {
                this.setState({errorMessage: error.data.message});
            });
        }
    }

    renderSuccessMessage = (): JSX.Element => {
        return (
            <div>
                Follow the instructions sent to your email address to reset your password.<br/><br/>
                <span style={{fontSize: '16px', fontWeight: 400}}>
                    Didn't receive the email? 
                    <a style={this.props.tryAgainLinkStyle} onClick={this.resetState}>Try Again</a>.
                </span>
            </div>
        );
    }

    renderPanelHeader = (): JSX.Element => {
        return (
            <div style={this.props.panelTitleStyle}>
                {this.state.showInputField ? this.props.paneltitle || 'Forgot Password?' : 'Check Your Email'}
            </div>
        );
    }

    renderPanelFooter = (): JSX.Element => {
        return (
            <div style={defaultFooterContainer}>
                <div style={pullLeft}>
                    {this.renderButtons(this.props.loginButtonStyle, this.props.loginButtonText || 'Log in')}
                </div>
                <div style={pullRight}>
                    {
                        this.renderButtons(
                                this.props.submitButtonStyle, 
                                this.props.submitButtonText || 'Reset Password', 
                                true)
                    }
                </div>
            </div>
        );
    }

    renderInputField = (): JSX.Element => {
        return (
            <FormGroup validationState={this.state.usernameError} style={removeMarginAndPadding}>
                <FormControl
                        id="email"
                        type="text"
                        placeholder={this.props.usernamePlaceholder || 'Username or email'}
                        style={this.props.inputStyle || defaultInputStyle}
                        onChange={this.handleEmail}
                />
                <HelpBlock>{this.state.usernameError ? 'This field is required.' : null}</HelpBlock>
            </FormGroup>
        );
    }

    resetState = (): void => {
        this.setState({
            email: '', 
            usernameError: null, 
            errorMessage: '',
            showInputField: true
        });
    }

    renderButtons = (buttonStyle: CSS, buttonText?: string, isSubmit: boolean = false): JSX.Element => {
        let buttonProps: {style: CSS, type?: string} = {
            style: buttonStyle
        };
        
        if (isSubmit) {
            buttonProps = {
                style: [buttonStyle, {visibility: this.state.showInputField ? 'visible' : 'hidden'}],
                type: 'submit'
            };
        }

        return (
            <Button {...buttonProps}>
                {buttonText}
            </Button>
        );
    }

    render(): JSX.Element {
        let bodyText: string = this.props.bodyText || 'Please enter the email you use for your account.';
        return (
            <div style={this.props.forgotPasswordContainerStyle || defaultPanelContainer}>
                <form onSubmit={this.submitForm}>
                    <Panel header={this.renderPanelHeader()} footer={this.renderPanelFooter()}>
                        <FormGroup style={removeMarginAndPadding}>
                            <label style={this.props.bodyTextStyle}>
                                {this.state.showInputField ? bodyText : this.renderSuccessMessage()}
                            </label>
                        </FormGroup>
                        {this.state.showInputField ? this.renderInputField() : null}
                        <div style={errorMessage}>
                            {this.state.errorMessage}
                        </div>
                    </Panel>
                </form>
            </div>
        );
    }
}
