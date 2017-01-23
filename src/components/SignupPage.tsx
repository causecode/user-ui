import * as React from 'react';
import * as Radium from 'radium';
import {pullRight, pullLeft, defaultFooterContainer} from '../constants/palette';
import {connect, MapStateToProps} from 'react-redux';
import {CSS, ISignupData, IState} from '../interfaces';
import {browserHistory} from 'react-router';
import {Panel, Button} from './ReusableComponents';
import {SignupForm} from './SignupForm';
import {sendRequest} from '../utils';
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
    onLoginButtonClick: string;
    onSubmitUrl: string;
    onSuccessUrl: string;
    userData?: ISignupData;
}

export interface ISignupPageStates {
    displaySignupForm?: boolean;
    showError?: boolean;
}

@Radium
export class SignupPageImpl extends React.Component<ISignupPageProps, ISignupPageStates> {

    constructor() {
        super();
        this.state = {displaySignupForm: false, showError: false};
    }

    submitForm = (): void => {
        let {userData, onSubmitUrl, onSuccessUrl} = this.props;
        let isEmptyFieldPresent: boolean = false;
        for (let key in userData) {
            if (!userData[key]) {
                isEmptyFieldPresent = true;
            }
        }

        isEmptyFieldPresent ? this.setState({showError: true}) : sendRequest(onSubmitUrl, onSuccessUrl, userData);
    }

    showSignupForm = (): void => {
        this.setState({displaySignupForm: true});
    }

    handleLoginButton = (): void => {
        browserHistory.push(this.props.onLoginButtonClick);
    }

    getPanelHeader = (): JSX.Element => {
        return (
            <div style={this.props.panelTitleStyle}>
                {this.props.paneltitle || 'Sign up'}
            </div>
        );
    }

    getPanelFooter = (): JSX.Element => {
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

    getSignupForm = (): JSX.Element => {
        return <SignupForm inputStyle={this.props.inputStyle}/>;
    }

    renderError = (): JSX.Element => {
        return (
            <div style={errorMessage}>
                All the fields are mandatory. Kindly enter your details in the empty fields.
            </div>
        );
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
                <Panel header={this.getPanelHeader()} footer={this.getPanelFooter()}>
                    {this.state.displaySignupForm ? this.getSignupForm() : this.showSignupOptions()}
                    {this.state.showError ? this.renderError() : null}
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
