import * as React from 'react';
import * as Radium from 'radium';
import {ControlLabel, FormControl, FormGroup, ReCaptcha, Radio, Form, Col} from './ReusableComponents';
import {removeMarginAndPadding, defaultInputStyle} from '../constants/palette';
import {handleSignupInput} from '../utils';
import {CSS} from '../interfaces';
const ReactDateTime = require<any>('react-datetime');

export interface ISignupFormStates {
    genderSelected?: string;
}

export interface ISignupFormProps {
    recaptchaSiteKey: string;
    inputStyle?: CSS;
}

@Radium
export class SignupForm extends React.Component<ISignupFormProps, ISignupFormStates> {

    constructor() {
        super();
        this.state = {genderSelected: ''};
    }

    changeGender = (event: React.FormEvent): void => {
        this.setState({genderSelected : event.target[`value`]});
        handleSignupInput('gender', event.target[`value`]);
    }

    handleTextInputChange = (event: React.FormEvent): void => {
        handleSignupInput(event.target[`id`], event.target[`value`]);
    }

    handleCaptcha = (value: string): void => {
        handleSignupInput('myRecaptchaResponse', value);
    }

    handleDateChange = (value: {toISOString: () => string}): void => {
        handleSignupInput('birthdate', value.toISOString());
    }

    render(): JSX.Element {
        return (
            <Form horizontal style={signupForm}>
                <FormGroup style={removeMarginAndPadding}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={5}>
                        <FormControl
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                style={this.props.inputStyle || defaultInputStyle}
                                onChange={this.handleTextInputChange}
                        />
                    </Col>
                    <Col sm={5}>
                        <FormControl
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                style={this.props.inputStyle || defaultInputStyle}
                                onChange={this.handleTextInputChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup style={removeMarginAndPadding}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                style={this.props.inputStyle || defaultInputStyle}
                                onChange={this.handleTextInputChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup style={removeMarginAndPadding}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Username
                    </Col>
                    <Col sm={10}>
                        <FormControl
                                id="username"
                                type="text"
                                placeholder="Username"
                                style={this.props.inputStyle || defaultInputStyle}
                                onChange={this.handleTextInputChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup style={removeMarginAndPadding}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl
                                id="password"
                                type="password"
                                placeholder="Password"
                                style={this.props.inputStyle || defaultInputStyle}
                                onChange={this.handleTextInputChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup style={removeMarginAndPadding}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Birthdate
                    </Col>
                    <Col sm={10}>
                        <ReactDateTime 
                                timeFormat={false} 
                                closeOnSelect={true} 
                                onChange={this.handleDateChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup style={removeMarginAndPadding}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Gender
                    </Col>
                    <Col sm={10}>
                        <Radio 
                                inline 
                                value="male"
                                onChange={this.changeGender}
                                checked={'male' === this.state.genderSelected}
                        >
                            Male
                        </Radio>
                        <Radio
                                inline 
                                value="female"
                                onChange={this.changeGender}
                                checked={'female' === this.state.genderSelected}
                        >
                            Female
                        </Radio>
                    </Col>
                </FormGroup>
                <FormGroup style={removeMarginAndPadding}>
                    <ReCaptcha
                            ref="recaptcha"
                            sitekey={this.props.recaptchaSiteKey}
                            onChange={this.handleCaptcha}
                            style={reCaptchaStyle}
                    />
                </FormGroup>
            </Form>
        );
    }
}

const reCaptchaStyle: CSS = {
    width: '100%',
    textAlign: '-webkit-center',
    padding: '15px'
};

const signupForm: CSS = {
    padding: '10px 0px'
};
