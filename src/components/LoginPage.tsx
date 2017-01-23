import * as React from 'react';
import * as Radium from 'radium';
import {Panel, FormControl, Button, Checkbox, FormGroup, HelpBlock} from './ReusableComponents';
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

export interface ILoginPageStyleProps {
    loginContainerStyle?: CSS;
    submitButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    footerLinkStyle?: CSS;
    inputStyle?: CSS;
}

export interface ILoginPageProps extends ILoginPageStyleProps {
    showRememberMeCheckbox?: boolean;
    usernamePlaceholder?: string;
    passwordPlaceholder?: string;
    submitButtonContent?: JSX.Element | string;
    onForgotPassword?: string;
    onSubmitUrl: string;
    successUrl: string;
    paneltitle?: string;
    onSignup?: string;
}

export interface ILoginPageStates {
    username?: string;
    password?: string;
    rememberMe?: boolean;
    usernameError?: validationType;
    passwordError?: validationType;
}

@Radium
export class LoginPage extends React.Component<ILoginPageProps, ILoginPageStates> {

    constructor() {
        super();
        this.state = {username: '', password: '', rememberMe: false, usernameError: null, passwordError: null};
    }

    handleRememberCheckbox = (): void => {
        let isChecked: boolean = this.state.rememberMe;
        this.setState({rememberMe: !isChecked});
    }

    handleUsername = (event: React.FormEvent): void => {
        let value: string = event.target[`value`];
        if (value) {
            this.setState({username: value, usernameError: null});
        }
    }

    handlePassword = (event: React.FormEvent): void => {
        let value: string = event.target[`value`];
        if (value) {
            this.setState({password: value, passwordError: null});
        }
    }

    submitForm = (event: React.FormEvent): void => {
        event.preventDefault();
        let username: string = this.state.username;
        let password: string = this.state.password;
        if (!username && !password) {
            this.setState({usernameError: 'error', passwordError: 'error'});
        } else if (!username) {
            this.setState({usernameError: 'error'});
        } else if (!password) {
            this.setState({passwordError: 'error'});
        } else {
            let requestData: {username: string, password: string, remember_me: boolean} = {
                username,
                password,
                remember_me: this.state.rememberMe
            };
            sendRequest(this.props.onSubmitUrl, this.props.successUrl, requestData);
        }
    }

    getPanelHeader = (): JSX.Element => {
        return (
            <div style={this.props.panelTitleStyle}>
                {this.props.paneltitle || 'Please enter your details.'}
            </div>
        );
    }

    getPanelFooter = (): JSX.Element => {
        return (
            <div style={defaultFooterContainer}>
                <div style={pullLeft}>
                    <a href={this.props.onForgotPassword} style={this.props.footerLinkStyle}>
                        <strong>Forgot password?</strong>
                    </a><br/>
                    <a href={this.props.onSignup} style={this.props.footerLinkStyle}>
                        <strong>Sign up now</strong>
                    </a>
                </div>
                <div style={pullRight}>
                    <Button type="submit" style={this.props.submitButtonStyle}>
                        {this.props.submitButtonContent || 'Log in'}
                    </Button>
                </div>
            </div>
        );
    }

    getRememberMeCheckbox = (): JSX.Element => {
        return (
            <Checkbox
                    id="rememberMeCheckbox"
                    onChange={this.handleRememberCheckbox}
            >
                <strong>Remember Me</strong>
            </Checkbox>
        );
    }


    render(): JSX.Element {
        return (
            <div style={this.props.loginContainerStyle || defaultPanelContainer}>
                <form onSubmit={this.submitForm}>
                    <Panel header={this.getPanelHeader()} footer={this.getPanelFooter()}>
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
                        <FormGroup validationState={this.state.passwordError} style={removeMarginAndPadding}>
                            <FormControl 
                                    id="password"
                                    type="password"
                                    placeholder={this.props.passwordPlaceholder || 'Password'}
                                    style={this.props.inputStyle || defaultInputStyle}
                                    onChange={this.handlePassword}
                            />
                            <HelpBlock>{this.state.passwordError ? 'This field is required.' : null}</HelpBlock>
                        </FormGroup>
                        {this.props.showRememberMeCheckbox ? this.getRememberMeCheckbox() : null}
                    </Panel>
                </form>
            </div>
        );
    }
}
