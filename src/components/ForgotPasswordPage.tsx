import * as React from 'react';
import * as Radium from 'radium';
import {Panel, FormControl, Button, FormGroup, HelpBlock} from './ReusableComponents';
import {CSS, validationType} from '../interfaces';
import {sendRequest} from '../utils';
import {MapStateToProps} from 'react-redux';
import {ISignupPageProps} from '../../dist/public/components/SignupPage';
import {IState} from '../../dist/public/interfaces/index';
import {UserModel} from '../models/UserModel';
import * as Axios from 'axios';
import {
        removeMarginAndPadding, 
        defaultFooterContainer,
        defaultPanelContainer,
        defaultInputStyle,
        pullRight,
        pullLeft
    } from '../constants/palette';

export interface IForgotPasswordPageStyleProps {
    forgotPasswordContainerStyle?: CSS;
    submitButtonStyle?: CSS;
    loginButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    bodyTextStyle?: CSS;
    inputStyle?: CSS;
}

export interface IForgotPasswordPageProps extends IForgotPasswordPageStyleProps {
    submitButtonContent?: JSX.Element | string;
    loginButtonContent?: JSX.Element | string;
    usernamePlaceholder?: string;
    paneltitle?: string;
    onSubmitUrl: string;
    successUrl: string;
    bodyText?: string;
}

export interface IForgotPasswordStates {
    email?: string;
    usernameError?: validationType;
    errorMessage?: string;
    showInputField?: boolean;
    successMessage?: string;
}

@Radium
export class ForgotPasswordPage extends React.Component<IForgotPasswordPageProps, IForgotPasswordStates> {

    constructor() {
        super();
        this.state = {
                email: '', 
                usernameError: null, 
                errorMessage: '',
                successMessage: 'Follow the instructions sent to your email address to reset your password.',
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
            Axios.post(this.props.onSubmitUrl, {email}).then((response) => {
                        console.log(`response`, response);
            }).catch((error) => {
                    console.log(`error`, error);
            });
        }
    }

    getPanelHeader = (): JSX.Element => {
        return (
            <div style={this.props.panelTitleStyle}>
                {this.props.paneltitle || 'Forgot Password?'}
            </div>
        );
    }

    getPanelFooter = (): JSX.Element => {
        return (
            <div style={defaultFooterContainer}>
                <div style={pullLeft}>
                    <Button style={this.props.loginButtonStyle}>
                        {this.props.loginButtonContent || 'Log in'}
                    </Button>
                </div>
                <div style={pullRight}>
                    <Button type="submit" style={this.props.submitButtonStyle}>
                        {this.props.submitButtonContent || 'Reset Password'}
                    </Button>
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

    render(): JSX.Element {
        let bodyText: string = this.props.bodyText || 'Please enter the email you use for your account.';
        return (
            <div style={this.props.forgotPasswordContainerStyle || defaultPanelContainer}>
                <form onSubmit={this.submitForm}>
                    <Panel header={this.getPanelHeader()} footer={this.getPanelFooter()}>
                        <FormGroup style={removeMarginAndPadding}>
                            <label style={this.props.bodyTextStyle}>
                                {this.state.showInputField ? bodyText : this.state.successMessage}
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

const errorMessage: CSS = {
    marginBotton: '10px',
    textAlign: 'center',
    color: '#FB540C'
};
