import * as React from 'react';
import * as Radium from 'radium';
import {connect, MapStateToProps} from 'react-redux';
import {CSS, ISignupData, IStateProps, ISubmitButton, ILoginButton} from '../../interfaces';
import {browserHistory} from 'react-router';
import {Panel, Button} from '../ReusableComponents';
import {SignupForm} from './SignupForm';
import {UserModel} from '../../models/UserModel';
import {dispatchToStore} from '../../utils';
import {updateSignupError} from '../../actions/signupAction';
import {ErrorMessage} from '../ErrorMessage';
import {PanelHeader} from '../PanelHeader';
import {PanelFooter} from '../PanelFooter';
import FontAwesome = require('react-fontawesome');

export interface ISignupPanelStyleProps {
    inputStyle?: CSS;
    signupContainerStyle?: CSS;
    panelTitleStyle?: CSS;
    signupOptionsButtonStyle?: CSS;
}

export interface ISignupPanelProps extends ISignupPanelStyleProps, ISubmitButton, ILoginButton {
    panelTitle?: string;
    onSubmitUrl: string;
    onLoginUrl: string;
    onSuccess: string;
    userData?: ISignupData;
    recaptchaSiteKey: string;
}

export interface ISignupPanelState {
    displaySignupForm?: boolean;
}

@Radium
export class SignupPanelImpl extends React.Component<ISignupPanelProps, ISignupPanelState> {

    constructor() {
        super();
        this.state = {displaySignupForm: false};
    }

    submitForm = (): void => {
        let {userData, onSubmitUrl, onSuccess} = this.props;
        delete userData.signupErrorMessage;
        let error: string = '';

        for (let key in userData) {
            if (!userData[key]) {
                error = 'All the fields are mandatory';
            }
        }

        error ? dispatchToStore(updateSignupError(error)) : UserModel.signup(onSubmitUrl, userData, onSuccess);
    }

    showSignupForm = (): void => {
        this.setState({displaySignupForm: true});
    }

    handleLoginButton = (): void => {
        browserHistory.push(this.props.onLoginUrl);
    }

    renderPanelFooter = (): JSX.Element => {
        return (
            <PanelFooter
                    submitButtonContent={this.props.submitButtonContent || 'Sign Up'}
                    submitButtonStyle={this.props.loginButtonStyle}
                    onSubmit={this.submitForm}
                    otherButtonContent={this.props.loginButtonContent || 'Log in'}
                    otherButtonStyle={this.props.loginButtonStyle}
                    otherButtonOnClick={this.handleLoginButton}
            />
        );
    }

    renderSignupForm = (): JSX.Element => {
        return (
            <SignupForm 
                    id="signupForm"
                    inputStyle={this.props.inputStyle}
                    recaptchaSiteKey={this.props.recaptchaSiteKey}
            />
        );
    }

    showSignupOptions = (): JSX.Element => {
        return (
            <div>
                <Button 
                        id="signupWithEmail"
                        style={this.props.signupOptionsButtonStyle || defaultOptionStyle}
                        onClick={this.showSignupForm}>
                    <FontAwesome name="envelope"/>Sign up with Email
                </Button>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div style={this.props.signupContainerStyle || defaultPanelContainer}>
                <Panel 
                        header={
                            <PanelHeader
                                    headerText={this.props.panelTitle || 'Sign up'}
                                    headerStyle={this.props.panelTitleStyle}
                            />
                        } 
                        footer={this.renderPanelFooter()}>
                    {this.state.displaySignupForm ? this.renderSignupForm() : this.showSignupOptions()}
                    <ErrorMessage message={this.props.userData.signupErrorMessage}/>
                </Panel>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IStateProps, ISignupPanelProps> = 
        (state: IStateProps): {userData: ISignupData} => {
    return {
        userData: state.signupData.toJS()
    };
};

let SignupPanel: React.ComponentClass<ISignupPanelProps> = connect(mapStateToProps)(SignupPanelImpl);
export {SignupPanel}

const defaultOptionStyle: CSS = {
    width: '100%',
    textAlign: 'center'
};

const defaultPanelContainer: CSS = {
    maxWidth: '650px',
    margin: '0px auto',
    padding: '30px'
};
