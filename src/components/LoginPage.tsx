import * as React from 'react';
import * as Radium from 'radium';
import {Panel, FormControl, Button, Checkbox, FormGroup, HelpBlock} from './ReusableComponents';
import {CSS, validationType, IState} from '../interfaces';
import {connect, MapStateToProps} from 'react-redux';
import {sendLoginRequest} from '../utils';
import {
        removeMarginAndPadding, 
        defaultFooterContainer,
        defaultPanelContainer,
        defaultInputStyle,
        pullRight,
        pullLeft
} from '../constants/palette';

export interface IMapStateToProps {
    isLoggedIn: boolean;
    errorMessage: string;
}

export interface ILoginPageStyleProps {
    loginContainerStyle?: CSS;
    submitButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    footerLinkStyle?: CSS;
    inputStyle?: CSS;
}

export interface ILoginPageProps extends ILoginPageStyleProps {
    showRememberMeCheckbox?: boolean;
    submitButtonContent?: JSX.Element | string;
    emailPlaceholder?: string;
    passwordPlaceholder?: string;
    onForgotPassword: string;
    onLoginSuccess: string;
    onSignup: string;
    onSubmit: string;
    paneltitle?: string;
    isLoggedIn?: boolean;
    hasLoginError?: boolean;
    errorMessage?: string;
}

export interface ILoginPageStates {
    email?: string;
    password?: string;
    rememberMe?: boolean;
    emailError?: validationType;
    passwordError?: validationType;
}

@Radium
export class LoginPageImpl extends React.Component<ILoginPageProps, ILoginPageStates> {

    constructor() {
        super();
        this.state = {email: '', password: '', rememberMe: false, emailError: null, passwordError: null};
    }

    handleRememberCheckbox = (): void => {
        let isChecked: boolean = this.state.rememberMe;
        this.setState({rememberMe: !isChecked});
    }

    handleInput = (event: React.FormEvent): void => {
        let value: string = event.target[`value`];
        let inputType: string = event.target[`id`];
        if (value) {
            this.setState({[`${inputType}`]: value, [`${inputType}Error`]: null});
        }
    }

    submitForm = (event: React.FormEvent): void => {
        event.preventDefault();
        let email: string = this.state.email;
        let password: string = this.state.password;
        if (!email && !password) {
            this.setState({emailError: 'error', passwordError: 'error'});
        } else if (!email) {
            this.setState({emailError: 'error'});
        } else if (!password) {
            this.setState({passwordError: 'error'});
        } else {
            let requestData: {email: string, password: string, remember_me: boolean} = {
                email,
                password,
                remember_me: this.state.rememberMe
            };
            sendLoginRequest(this.props.onSubmit, requestData, this.props.onLoginSuccess);
        }
    }

    renderPanelHeader = (): JSX.Element => {
        return (
            <div style={this.props.panelTitleStyle}>
                {this.props.paneltitle || 'Please enter your details.'}
            </div>
        );
    }

    renderPanelFooter = (): JSX.Element => {
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

    renderRememberMeCheckbox = (): JSX.Element => {
        return (
            <Checkbox
                    id="rememberMeCheckbox"
                    onChange={this.handleRememberCheckbox}>
                <strong>Remember Me</strong>
            </Checkbox>
        );
    }

    renderError = (): JSX.Element => {
        return (
            <div style={errorStyle}>
                {this.props.errorMessage}
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div style={this.props.loginContainerStyle || defaultPanelContainer}>
                <form onSubmit={this.submitForm}>
                    <Panel header={this.renderPanelHeader()} footer={this.renderPanelFooter()}>
                        <FormGroup validationState={this.state.emailError} style={removeMarginAndPadding}>
                            <FormControl
                                    id="email"
                                    type="text"
                                    placeholder={this.props.emailPlaceholder || 'email'}
                                    style={this.props.inputStyle || defaultInputStyle}
                                    onChange={this.handleInput}
                            />
                            <HelpBlock>{this.state.emailError ? 'This field is required.' : null}</HelpBlock>
                        </FormGroup>
                        <FormGroup validationState={this.state.passwordError} style={removeMarginAndPadding}>
                            <FormControl 
                                    id="password"
                                    type="password"
                                    placeholder={this.props.passwordPlaceholder || 'Password'}
                                    style={this.props.inputStyle || defaultInputStyle}
                                    onChange={this.handleInput}
                            />
                            <HelpBlock>{this.state.passwordError ? 'This field is required.' : null}</HelpBlock>
                        </FormGroup>
                        {this.props.showRememberMeCheckbox ? this.renderRememberMeCheckbox() : null}
                        {this.renderError()}
                    </Panel>
                </form>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IState, ILoginPageProps> = (state: IState): IMapStateToProps => {
    return {
        isLoggedIn: state.currentUser.get('isLoggedIn'),
        errorMessage: state.currentUser.get('loginErrorMessage')
    };
};

let LoginPage: React.ComponentClass<ILoginPageProps> = connect(mapStateToProps)(LoginPageImpl);
export {LoginPage};

const errorStyle: CSS = {
    marginBotton: '10px',
    textAlign: 'center',
    color: '#FB540C'
};
