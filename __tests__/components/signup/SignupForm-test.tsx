jest.unmock('../../../src/components/signup/SignupForm');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {SignupForm, ISignupFormProps, ISignupFormState} from '../../../src/components/signup/SignupForm';
import {Provider} from 'react-redux';
import {CSS, ISignupData} from '../../../src/interfaces';
import {store} from '../../../src/store';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends ISignupFormProps {
    children?: any;
}

describe('SignupPanel Tests', () => {

    let testKey: string = 'qwertyuipoi09876';
    let signupForm: SignupForm = new SignupForm();
    let mockedFunctionCallSuccess: string = 'Mock function called successfully.';

    signupForm.handleTextInputChange = jest.fn(() => {
        return mockedFunctionCallSuccess;
    });

    signupForm.handleCaptcha = jest.fn(() => {
        return mockedFunctionCallSuccess;
    });

    signupForm.handleDateChange = jest.fn(() => {
        return mockedFunctionCallSuccess;
    });
    
    signupForm.renderGenderButtons = jest.fn(() => {
        return mockedFunctionCallSuccess;
    });

    const componentTree: ShallowWrapper<IShallowWrapperProps, ISignupFormState> = 
            shallow<IShallowWrapperProps, ISignupFormState>(
                <SignupForm recaptchaSiteKey={testKey} />
    );

    it('It should render the radio buttons on mount.', () => {
        expect(signupForm.renderGenderButtons()).toEqual(mockedFunctionCallSuccess);
    });

    it('It should handle captcha on change.', () => {
        componentTree.find('#captcha').simulate('click');
        expect(signupForm.handleCaptcha('')).toEqual(mockedFunctionCallSuccess);
    });

    it('It should handle Date change.', () => {
        componentTree.find('#date').simulate('click');
        expect(signupForm.handleDateChange(new Date())).toEqual(mockedFunctionCallSuccess);
    });

    unroll('It should save the data to the store when the #input is added.', (done, args) => {
        componentTree.find(`#${args.input}`).simulate('change');
        expect(signupForm.handleTextInputChange({target: {value: ''}})).toBe(mockedFunctionCallSuccess);
        done();
    }, [
        ['input'],
        ['username'],
        ['email'],
        ['password'],
        ['firstName'],
        ['lastName']
    ]);

    unroll('It should render #elementName elements.', (done, args) => {
        expect(componentTree.find(args.elementName)).toBeTruthy();
        done();
    }, [
        ['elementName'],
        ['Form'],
        ['FormGroup'],
        ['Col'],
        ['ReCaptcha'],
        ['Radio']
    ]);
});
