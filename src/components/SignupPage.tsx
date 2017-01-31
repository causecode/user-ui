import * as React from 'react';
import * as Radium from 'radium';
import {pullRight, pullLeft, defaultFooterContainer} from '../constants/palette';
import {connect, MapStateToProps} from 'react-redux';
import {CSS, ISignupData, IState} from '../interfaces';
import {browserHistory} from 'react-router';
import {Panel, Button} from './ReusableComponents';
import {SignupForm} from './SignupForm';
import {UserModel} from '../models/UserModel';
import {dispatchToStore} from '../utils';
import {updateSignupError} from '../actions/signupAction';
import FontAwesome = require('react-fontawesome');

export interface ISignupPageStyleProps {
    inputStyle?: CSS;
    signupContainerStyle?: CSS;
    panelTitleStyle?: CSS;
    signupButtonStyle?: CSS;
    loginButtonStyle?: CSS;
    signupOptionsButtonStyle?: CSS;
}

export interface ISignupPageProps extends ISignupPageStyleProps {
    paneltitle?: string;
    onLogin: string;
    onSubmit: string;
    onSuccess: string;
    userData?: ISignupData;
    recaptchaSiteKey: string;
}

export interface ISignupPageStates {
    displaySignupForm?: boolean;
}

@Radium
export class SignupPageImpl extends React.Component<ISignupPageProps, ISignupPageStates> {

    constructor() {
        super();
        this.state = {displaySignupForm: false};
    }

    submitForm = (): void => {
        let {userData, onSubmit, onSuccess} = this.props;
        delete userData.signupErrorMessage;
        let error: string = '';

        for (let key in userData) {
            if (!userData[key]) {
                error = 'All the fields are mandatory';
            }
        }
    
        error ? dispatchToStore(updateSignupError(error)) : UserModel.signup(onSubmit, userData, onSuccess);
    }

    showSignupForm = (): void => {
        this.setState({displaySignupForm: true});
    }

    handleLoginButton = (): void => {
        browserHistory.push(this.props.onLogin);
    }

    renderPanelHeader = (): JSX.Element => {
        return (
            <div style={this.props.panelTitleStyle}>
                {this.props.paneltitle || 'Sign up'}
            </div>
        );
    }

    renderPanelFooter = (): JSX.Element => {
        return (
            <div style={defaultFooterContainer}>
                <div style={pullLeft}>
                    <Button style={this.props.loginButtonStyle} onClick={this.handleLoginButton}>
                        Log in
                    </Button>
                </div>
                <div style={pullRight}>
                    <Button style={this.props.signupButtonStyle} onClick={this.submitForm}>
                        Sign up
                    </Button>
                </div>
            </div>
        );
    }

    renderSignupForm = (): JSX.Element => {
        return <SignupForm inputStyle={this.props.inputStyle} recaptchaSiteKey={this.props.recaptchaSiteKey}/>;
    }

    showSignupOptions = (): JSX.Element => {
        return (
            <div>
                <Button 
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
                <Panel header={this.renderPanelHeader()} footer={this.renderPanelFooter()}>
                    {this.state.displaySignupForm ? this.renderSignupForm() : this.showSignupOptions()}
                    <div style={errorMessage}>
                        {this.props.userData.signupErrorMessage}
                    </div>
                </Panel>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IState, ISignupPageProps> = (state: IState): {userData: ISignupData} => {
    return {
        userData: state.signupData.toJS()
    };
};

let SignupPage: React.ComponentClass<ISignupPageProps> = connect(mapStateToProps)(SignupPageImpl);
export {SignupPage}

const defaultOptionStyle: CSS = {
    width: '100%',
    textAlign: 'center'
};

const defaultPanelContainer: CSS = {
    maxWidth: '650px',
    margin: '0px auto',
    padding: '30px'
};

const errorMessage: CSS = {
    marginBotton: '10px',
    textAlign: 'center',
    color: '#FB540C'
};
