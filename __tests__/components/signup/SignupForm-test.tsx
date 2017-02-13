jest.unmock('../../../src/components/signup/SignupForm');
jest.mock('../../../src/utils');

import * as React from 'react';
import {SignupForm, ISignupFormProps, ISignupFormState} from '../../../src/components/signup/SignupForm';
import {shallow, ShallowWrapper} from 'enzyme';
import {handleSignupInput} from '../../../src/utils';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends ISignupFormProps {
    children?: any;
}

describe('SignupPanel Tests', (): void => {

    let testKey: string = 'qwertyuipoi09876';

    const componentTree: ShallowWrapper<IShallowWrapperProps, ISignupFormState> = 
            shallow<IShallowWrapperProps, ISignupFormState>(
                <SignupForm recaptchaSiteKey={testKey} />
    );

    unroll('It should render #elementName elements.', (
                done: () => void, 
                args: {elementName: string, count: number}
            ): void => {
        expect(componentTree.find(args.elementName).length).toBe(args.count);
        done();
    }, [
        ['elementName', 'count'],
        ['Form', 1],
        ['FormGroup', 7],
        ['Col', 13],
        ['Radio', 2]
    ]);

    it('It should handle the radio buttons when clicked.', (): void => {
        expect(componentTree.state('genderSelected')).toEqual('');
        componentTree.find('#male').simulate('change', {target: {value: 'male'}});
        expect(componentTree.state('genderSelected')).toEqual('male');
        expect(handleSignupInput).toBeCalled();
    });

    unroll('It should handle #input on change', (
                done: () => void, 
                args: {input: string, param: string | Date}
            ): void => {
        componentTree.find(`#${args.input}`).simulate('change', args.param);
        expect(handleSignupInput).toBeCalled();
        done();
    }, [
        ['input', 'param'],
        ['date', new Date()],
        ['captcha', testKey]
    ]);

    unroll('It should save the data to the store when the #input is added.', (
                done: () => void, 
                args: {input: string}
            ): void => {
        componentTree.find(`#${args.input}`).simulate('change', {target: {value: args.input}});
        expect(handleSignupInput).toBeCalled();
        done();
    }, [
        ['input'],
        ['username'],
        ['email'],
        ['password'],
        ['firstName'],
        ['lastName']
    ]);
});
