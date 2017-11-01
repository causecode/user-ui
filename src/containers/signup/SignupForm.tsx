import * as React from 'react';
import * as Radium from 'radium';
import {RadioProps, FormControlProps} from 'react-bootstrap';
import {ControlLabel, FormControl, FormGroup, Radio, Form, Col, ReCaptcha} from '../ReusableComponents';
import {removeMarginAndPadding, defaultInputStyle} from '../../constants/palette';
import {handleSignupInput} from '../../utils';
import {CSS} from '../../interfaces';
const ReactDateTime = require<any>('react-datetime');

export interface ISignupFormState {
    genderSelected?: string;
}

export interface ISignupFormProps {
    id?: string;
    recaptchaSiteKey: string;
    inputStyle?: CSS;
}

@Radium
export class SignupForm extends React.Component<ISignupFormProps, ISignupFormState> {

    constructor() {
        super();
        this.state = {genderSelected: ''};
    }

    changeGender = (event: React.FormEvent<RadioProps>): void => {
        this.setState({genderSelected : event.target[`value`]});
        handleSignupInput('gender', event.target[`value`]);
    }

    handleTextInputChange = (event: React.FormEvent<React.Component<FormControlProps, {}>>): void => {
        handleSignupInput(event.target[`id`], event.target[`value`]);
    }

    handleCaptcha = (value: string): void => {
        handleSignupInput('myRecaptchaResponse', value);
    }

    handleDateChange = (value: {toISOString: () => string}): void => {
        handleSignupInput('birthdate', value.toISOString());
    }

    renderGenderButtons = (): JSX.Element[] => {
        return ['male', 'female'].map((item: string, index: number): JSX.Element => {
            return (
                <Radio
                        id={item}
                        inline
                        value={item}
                        onChange={this.changeGender}
                        checked={item === this.state.genderSelected}
                        key={index}
                >
                    {item.capitalize()}
                </Radio>
            );
        });
    }

    render(): JSX.Element {
        return (
            <Form horizontal style={signupForm} id={this.props.id}>
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
                                id="date"
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
                        {this.renderGenderButtons()}
                    </Col>
                </FormGroup>
                <FormGroup style={removeMarginAndPadding}>
                    <ReCaptcha
                            id="captcha"
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
    padding: '15px',
};

const signupForm: CSS = {
    padding: '10px 0px',
};
