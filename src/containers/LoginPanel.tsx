import * as React from 'react';
import * as Radium from 'radium';
import {connect, MapStateToProps} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {FormControlProps} from 'react-bootstrap';
import {Button, Checkbox, FormGroup, HelpBlock, Panel, FormControl, Link} from './ReusableComponents';
import {CSS, validationType, IStateProps} from '../interfaces';
import {ErrorMessage} from './ErrorMessage';
import {PanelHeader} from './PanelHeader';
import {UserModel} from '../models/UserModel';
import {
    removeMarginAndPadding,
    defaultFooterContainer,
    defaultPanelContainer,
    defaultInputStyle,
    pullRight,
    pullLeft,
} from '../constants/palette';

export interface IMapStateToProps {
    isLoggedIn: boolean;
    errorMessage: string;
}

export interface ILoginPanelStyleProps {
    loginContainerStyle?: CSS;
    submitButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    footerLinkStyle?: CSS;
    inputStyle?: CSS;
}

export interface ILoginPanelProps extends ILoginPanelStyleProps {
    showRememberMeCheckbox?: boolean;
    submitButtonContent?: JSX.Element | string;
    emailPlaceholder?: string;
    passwordPlaceholder?: string;
    onForgotPassword: string;
    onLoginSuccess: string;
    onSignup: string;
    onSubmit: string;
    panelTitle?: string;
    isLoggedIn?: boolean;
    hasLoginError?: boolean;
    errorMessage?: string;
    getBasicUserData?: boolean;
    allowSignup?: boolean;
}

export interface ILoginPanelState {
    email?: string;
    password?: string;
    rememberMe?: boolean;
    emailError?: validationType;
    passwordError?: validationType;
}

@Radium
export class LoginPanelImpl extends React.Component<ILoginPanelProps & RouteComponentProps<void>, ILoginPanelState> {

    constructor() {
        super();
        this.state = {email: '', password: '', rememberMe: false, emailError: null, passwordError: null};
    }

    static defaultProps = {
        allowSignup: true,
    };

    handleRememberCheckbox = (): void => {
        let isChecked: boolean = this.state.rememberMe;
        this.setState({rememberMe: !isChecked});
    }

    handleInput = (event: React.FormEvent<React.Component<FormControlProps, {}>>): void => {
        let value: string = event.target[`value`];
        let inputType: string = event.target[`id`];
        if (value) {
            this.setState({[`${inputType}`]: value, [`${inputType}Error`]: null});
        }
    }

    submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        let {onSubmit, onLoginSuccess, history, getBasicUserData} = this.props;
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
                remember_me: this.state.rememberMe,
            };
            UserModel.login(onSubmit, requestData, onLoginSuccess, history, getBasicUserData);
        }
    }

    renderPanelFooter = (): JSX.Element => {
        return (
            <div style={defaultFooterContainer}>
                <div style={pullLeft}>
                    <Link to={this.props.onForgotPassword} style={this.props.footerLinkStyle}>
                        <strong>Forgot password?</strong>
                    </Link><br/>
                    <Link to={this.props.onSignup} style={this.props.footerLinkStyle}>
                        <strong>{this.props.allowSignup ? 'Sign up now' : ''}</strong>
                    </Link>
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

    render(): JSX.Element {
        return (
            <div style={this.props.loginContainerStyle || defaultPanelContainer}>
                <form onSubmit={this.submitForm} id="loginForm">
                    <Panel
                            header={
                                <PanelHeader
                                        headerStyle={this.props.panelTitleStyle}
                                        headerText={this.props.panelTitle || 'Please enter your details.'}/>
                            }
                            footer={this.renderPanelFooter()}>
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
                        <ErrorMessage message={this.props.errorMessage}/>
                    </Panel>
                </form>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IStateProps, ILoginPanelProps> = (state: IStateProps): IMapStateToProps => {
    return {
        isLoggedIn: state.currentUser.get('isLoggedIn'),
        errorMessage: state.currentUser.get('loginErrorMessage'),
    };
};

export const LoginPanel: React.ComponentClass<ILoginPanelProps> = withRouter(connect(mapStateToProps)(LoginPanelImpl));
