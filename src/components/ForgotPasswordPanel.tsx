import * as React from 'react';
import * as Radium from 'radium';
import {removeMarginAndPadding, defaultPanelContainer, defaultInputStyle} from '../constants/palette';
import {CSS, validationType, IAxiosResponse, ILoginButton, ISubmitButton} from '../interfaces';
import {Panel, FormControl, FormGroup, HelpBlock} from './ReusableComponents';
import {browserHistory} from 'react-router';
import {ErrorMessage} from './ErrorMessage';
import {PanelHeader} from './PanelHeader';
import {PanelFooter} from './PanelFooter';
import {UserModel} from '../models/UserModel';

export interface IForgotPasswordPanelStyleProps {
    forgotPasswordContainerStyle?: CSS;
    tryAgainLinkStyle?: CSS;
    panelTitleStyle?: CSS;
    bodyTextStyle?: CSS;
    inputStyle?: CSS;
}

export interface IForgotPasswordPanelProps extends IForgotPasswordPanelStyleProps, ILoginButton, ISubmitButton {
    usernamePlaceholder?: string;
    panelTitle?: string;
    onSubmitUrl: string;
    bodyText?: string;
}

export interface IForgotPasswordPanelState {
    showInputField?: boolean;
    usernameError?: validationType;
    errorMessage?: string;
    email?: string;
}

@Radium
export class ForgotPasswordPanel extends React.Component<IForgotPasswordPanelProps, IForgotPasswordPanelState> {

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
            UserModel.forgotPassword(this.props.onSubmitUrl, email)
                .then((response: IAxiosResponse): void => {
                    this.setState({showInputField: false, errorMessage: ''});
                })
                .catch((error: {data: {message: string}}) => {
                    this.setState({errorMessage: error.data.message});
                });
        }
    }

    handleLoginButton = (): void => {
        browserHistory.push(this.props.onLoginUrl);
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

    renderFooter = (): JSX.Element => {
        return (
            <PanelFooter
                    otherButtonStyle={this.props.loginButtonStyle}
                    otherButtonContent={this.props.loginButtonContent || 'Log in'}
                    otherButtonOnClick={this.handleLoginButton}
                    submitForm
                    submitButtonContent={this.props.submitButtonContent || 'Reset Password'}
                    submitButtonStyle={[
                        this.props.submitButtonStyle,
                        {visibility: this.state.showInputField ? 'visible' : 'hidden'}
                    ]}
            />
        );
    }

    render(): JSX.Element {
        let bodyText: string = this.props.bodyText || 'Please enter the email you use for your account.';
        let panelTitle: string = this.state.showInputField ? 
                this.props.panelTitle || 'Forgot Password?' : 'Check Your Email';
        return (
            <div style={this.props.forgotPasswordContainerStyle || defaultPanelContainer}>
                <form onSubmit={this.submitForm}>
                    <Panel 
                            header={<PanelHeader headerText={panelTitle} headerStyle={this.props.panelTitleStyle}/>} 
                            footer={this.renderFooter()}>
                        <FormGroup style={removeMarginAndPadding}>
                            <label style={this.props.bodyTextStyle}>
                                {this.state.showInputField ? bodyText : this.renderSuccessMessage()}
                            </label>
                        </FormGroup>
                        {this.state.showInputField ? this.renderInputField() : null}
                        <ErrorMessage message={this.state.errorMessage}/>
                    </Panel>
                </form>
            </div>
        );
    }
}
