import * as React from 'react';
import * as Radium from 'radium';
import * as Axios from 'axios';
import {Panel, FormControl, Button, FormGroup, HelpBlock} from './ReusableComponents';
import {CSS, validationType} from '../interfaces';
import {
    removeMarginAndPadding, 
    defaultFooterContainer,
    defaultPanelContainer,
    defaultInputStyle,
    errorMessage,
    pullRight
} from '../constants/palette';

export interface IForgotPasswordPageStyleProps {
    resetPasswordContainerStyle?: CSS;
    submitButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    bodyTextStyle?: CSS;
    inputStyle?: CSS;
}

export interface IForgotPasswordPageProps extends IForgotPasswordPageStyleProps {
    submitButtonText?: string;
    paneltitle?: string;
    onSubmitUrl: string;
    successUrl: string;
}

export interface IForgotPasswordStates {
    newPassword?: string;
    confirmPassword?: string;
    newPasswordError?: validationType;
    confirmPasswordError?: validationType;
    passwordChanged?: boolean;
    errorMessage?: string;
}

let token: string = '';
let email: string = '';

@Radium
export class ResetPasswordPanel extends React.Component<IForgotPasswordPageProps, IForgotPasswordStates> {

    constructor() {
        super();
        this.state = {
            newPassword: '', 
            confirmPassword: '', 
            newPasswordError: null,
            confirmPasswordError: null,
            passwordChanged: false,
            errorMessage: ''
        };
    }

    componentWillMount = (): void => {
        let redirectUrl: string = window.location.href;
        if (redirectUrl.indexOf('token') >= 0 && redirectUrl.indexOf('email') >= 0) {
            /**
             * Extracting the query parameters this way because this.props.location 
             * was not present in the route.
             */
            let urlArray: String[] = redirectUrl.split('&');
            token = urlArray[1].substring(urlArray[1].indexOf('=') + 1);
            email = urlArray[2].substring(urlArray[2].indexOf('=') + 1);
        }
    }

    handleInputChange = (event: React.FormEvent): void => {
        let value: string = event.target[`value`];
        let inputType: string = event.target[`id`];
        if (value) {
            this.setState({[`${inputType}`]: value, [`${inputType}Error`]: null});
        }
    }

    submitForm = (event: React.FormEvent): void => {
        event.preventDefault();
        let newPassword: string = this.state.newPassword;
        let confirmPassword: string = this.state.confirmPassword;
        if (!newPassword) {
            this.setState({newPasswordError: 'error'});
        } else if (!confirmPassword) {
            this.setState({confirmPasswordError: 'error'});
        } else if (newPassword !== confirmPassword) {
            this.setState({passwordChanged: false, errorMessage: 'Passwords do not match.'});
        } else {
            Axios.post(this.props.onSubmitUrl, {token, email}).then((response) => {
                this.setState({passwordChanged: true, errorMessage: ''});
            }).catch((error: {data: {message: string}}) => {
                this.setState({passwordChanged: false, errorMessage: error.data.message});
            });
        }
    }

    renderPanelHeader = (): JSX.Element => {
        return (
            <div style={this.props.panelTitleStyle}>
                {!this.state.passwordChanged ? this.props.paneltitle || 'Enter your new password' : 'Password Changed'}
            </div>
        );
    }

    renderPanelFooter = (): JSX.Element => {
        let buttonProps: {style: CSS, type?: string} = {
            style: [this.props.submitButtonText, {visibility: this.state.passwordChanged ? 'hidden' : 'visible'}],
            type: 'submit'
        };

        return (
            <div style={defaultFooterContainer}>
                <div style={pullRight}>
                    <Button {...buttonProps}>
                        {this.props.submitButtonText || 'Reset Password'}
                    </Button>
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div style={this.props.resetPasswordContainerStyle || defaultPanelContainer}>
                <form style={{padding: '10px 0px'}} onSubmit={this.submitForm}>
                    <Panel header={this.renderPanelHeader()} footer={this.renderPanelFooter()}>
                        <label style={{visibility: this.state.passwordChanged ? 'visible' : 'hidden'}}>
                            Password changed successfully. Please login to continue.
                        </label>
                        <div style={{visibility: this.state.passwordChanged ? 'hidden' : 'visible'}}>
                            <label>Please enter your new password:</label>
                            <FormGroup style={removeMarginAndPadding} validationState={this.state.newPasswordError}>
                                <FormControl
                                        id="newPassword"
                                        type="password"
                                        style={this.props.inputStyle || defaultInputStyle}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter your new password"
                                />
                                <HelpBlock>
                                    {this.state.newPasswordError ? 'This field is required.' : null}
                                </HelpBlock>
                            </FormGroup>
                            <label>Enter your new password again:</label>
                            <FormGroup style={removeMarginAndPadding} validationState={this.state.confirmPasswordError}>
                                <FormControl
                                        id="confirmPassword"
                                        type="password"
                                        style={this.props.inputStyle || defaultInputStyle}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter your new password again"
                                />
                                <HelpBlock>
                                    {this.state.confirmPasswordError ? 'This field is required.' : null}
                                </HelpBlock>
                            </FormGroup>
                        </div>
                        <div style={errorMessage}>
                            {this.state.errorMessage}
                        </div>
                    </Panel>
                </form>
            </div>
        );
    }
}
