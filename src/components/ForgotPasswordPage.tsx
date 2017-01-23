import * as React from 'react';
import * as Radium from 'radium';
import {Panel, FormControl, Button, FormGroup, HelpBlock} from './ReusableComponents';
import {CSS, validationType} from '../interfaces';
import {sendRequest} from '../utils';
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
    username?: string;
    usernameError?: validationType;
}

@Radium
export class ForgotPasswordPage extends React.Component<IForgotPasswordPageProps, IForgotPasswordStates> {

    constructor() {
        super();
        this.state = {username: '', usernameError: null};
    }

    handleUsername = (event: React.FormEvent): void => {
        let value: string = event.target[`value`];
        if (value) {
            this.setState({username: value, usernameError: null});
        }
    }

    submitForm = (event: React.FormEvent): void => {
        event.preventDefault();
        let username: string = this.state.username;
        if (!username) {
            this.setState({usernameError: 'error'});
        } else {
            let requestData: {username: string} = {username};
            sendRequest(this.props.onSubmitUrl, this.props.successUrl, requestData);
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

    render(): JSX.Element {
        return (
            <div style={this.props.forgotPasswordContainerStyle || defaultPanelContainer}>
                <form onSubmit={this.submitForm}>
                    <Panel header={this.getPanelHeader()} footer={this.getPanelFooter()}>
                        <FormGroup style={removeMarginAndPadding}>
                            <label style={this.props.bodyTextStyle}>
                                {this.props.bodyText || 'Please enter the username you use for your account.'}
                            </label>
                        </FormGroup>
                        <FormGroup validationState={this.state.usernameError} style={removeMarginAndPadding}>
                            <FormControl
                                    id="username"
                                    type="text"
                                    placeholder={this.props.usernamePlaceholder || 'Username'}
                                    style={this.props.inputStyle || defaultInputStyle}
                                    onChange={this.handleUsername}
                            />
                            <HelpBlock>{this.state.usernameError ? 'This field is required.' : null}</HelpBlock>
                        </FormGroup>
                    </Panel>
                </form>
            </div>
        );
    }
}
