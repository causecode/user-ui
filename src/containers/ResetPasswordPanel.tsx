import * as React from 'react';
import * as Radium from 'radium';
import {RouteComponentProps, withRouter} from 'react-router';
import {FormControlProps} from 'react-bootstrap';
import {Panel, FormControl, FormGroup, HelpBlock} from './ReusableComponents';
import {removeMarginAndPadding, defaultPanelContainer, defaultInputStyle} from '../constants/palette';
import {CSS, validationType, ISubmitButton, IAxiosResponse} from '../interfaces';
import {ErrorMessage} from './ErrorMessage';
import {PanelHeader} from './PanelHeader';
import {PanelFooter} from './PanelFooter';
import {UserModel} from '../models/UserModel';

export interface IResetPasswordPanelStyleProps {
    resetPasswordContainerStyle?: CSS;
    loginButtonStyle?: CSS;
    panelTitleStyle?: CSS;
    bodyTextStyle?: CSS;
    inputStyle?: CSS;
}

export interface IResetPasswordPanelProps extends IResetPasswordPanelStyleProps, ISubmitButton {
    paneltitle?: string;
    onSubmitUrl?: string;
    successUrl?: string;
    onLoginUrl?: string;
}

export interface IResetPasswordPanelState {
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
export class ResetPasswordPanelImpl extends
        React.Component<IResetPasswordPanelProps & RouteComponentProps<void>, IResetPasswordPanelState> {

    constructor() {
        super();
        this.state = {
            newPassword: '',
            confirmPassword: '',
            newPasswordError: null,
            confirmPasswordError: null,
            passwordChanged: false,
            errorMessage: '',
        };
    }

    componentWillMount(): void {
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

    handleInputChange = (event: React.FormEvent<React.Component<FormControlProps, {}>>): void => {
        let value: string = event.target[`value`];
        let inputType: string = event.target[`id`];
        if (value) {
            this.setState({[`${inputType}`]: value, [`${inputType}Error`]: null});
        }
    }

    submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
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
            UserModel.resetPassword(this.props.onSubmitUrl, token, email, newPassword, confirmPassword)
                .then((response: IAxiosResponse): void => {
                    this.setState({passwordChanged: true, errorMessage: ''});
                    if (this.props.successUrl) {
                        this.props.history.push(this.props.successUrl);
                    }
                }).catch((error: {data: {message: string}}): void => {
                    this.setState({passwordChanged: false, errorMessage: error.data.message});
                });
        }
    }

    handleLoginButton = (): void => {
        this.props.history.push(this.props.onLoginUrl || 'login');
    }

    renderPanelFooter = (): JSX.Element => {
        return (
            <PanelFooter
                    otherButtonStyle={this.props.loginButtonStyle}
                    otherButtonContent="Log in"
                    otherButtonOnClick={this.handleLoginButton}
                    showOnlySubmitButton
                    submitForm
                    submitButtonStyle={
                        [this.props.submitButtonStyle, {visibility: this.state.passwordChanged ? 'hidden' : 'visible'}]
                    }
                    submitButtonContent={this.props.submitButtonContent || 'Reset Password'}
            />
        );
    }

    render(): JSX.Element {
        let headerText: string = !this.state.passwordChanged ?
                 this.props.paneltitle || 'Enter your new password' : 'Password Changed';

        return (
            <div style={this.props.resetPasswordContainerStyle || defaultPanelContainer}>
                <form style={{padding: '10px 0px'}} onSubmit={this.submitForm} id="resetPaswordForm">
                    <Panel
                            header={<PanelHeader headerText={headerText} headerStyle={this.props.panelTitleStyle}/>}
                            footer={this.renderPanelFooter()}>
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
                        <ErrorMessage message={this.state.errorMessage}/>
                    </Panel>
                </form>
            </div>
        );
    }
}

export const ResetPasswordPanel: React.ComponentClass<IResetPasswordPanelProps> = withRouter(ResetPasswordPanelImpl);
