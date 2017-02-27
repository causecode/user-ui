jest.unmock('../../src/components/ResetPasswordPanel');
jest.mock('../../src/utils');
jest.mock('react-router');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {browserHistory} from 'react-router';
import {UserModel} from '../../src/models/UserModel';
import {HTTP} from 'react-hero';
import {
    ResetPasswordPanel,
    IResetPasswordPanelProps,
    IResetPasswordPanelState
} from '../../src/components/ResetPasswordPanel';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends IResetPasswordPanelProps {
    children?: any;
}

let testEmail: string = 'something@example.com';
let testToken: string = 'qwerty12345';

Object.defineProperty(window.location, 'href', {
    writable: true,
    value: `http://validate=true&token=${testToken}&email=${testEmail}`
});

describe('ResetPasswordPanel Tests.', (): void => {

    let testPath: string = 'http://some/path';
    let componentTree: ShallowWrapper<IShallowWrapperProps, IResetPasswordPanelState>;

    beforeEach(() => {
        HTTP.postRequest = jest.fn((url, {}, data: {email: string, token: string}) => {
                return new Promise((resolve, reject): void => {
                    if ((data.email === testEmail) && (data.token === testToken)) {
                        resolve({success: true});
                    } else {
                        reject({data: {message: 'error occured.'}});
                    }
                });
            });

        componentTree = shallow<IShallowWrapperProps, IResetPasswordPanelState>(
                <ResetPasswordPanel
                        onSubmitUrl={testPath}
                        successUrl={testPath}
                />
        );
    });

    unroll('It should render #elementName elements.', (
            done: () => void,
            args: {elementName: string, count: number}
    ): void => {
        expect(componentTree.find(args.elementName).length).toBe(args.count);
        done();
    }, [
        ['elementName', 'count'],
        ['div', 2],
        ['Panel', 1],
        ['ErrorMessage', 1],
        ['form', 1],
        ['FormGroup', 2],
        ['FormControl', 2],
        ['HelpBlock', 2],
        ['label', 3]
    ]);

    unroll('It should not save #input to the state when value is empty.', (
            done: () => void, 
            args: {input: string}
    ): void => {
        expect(componentTree.state(args.input)).toBe('');
        componentTree.find(`#${args.input}`).simulate('change', {target: {value: '', id: args.input}});
        expect(componentTree.state(args.input)).toBe('');
        done();
    }, [
        ['input'],
        ['newPassword'],
        ['confirmPassword']
    ]);

    unroll('It should save #input to the state when changed.', (done: () => void, args: {input: string}): void => {
        expect(componentTree.state(args.input)).toBe('');
        componentTree.find(`#${args.input}`).simulate('change', {target: {value: 'test', id: args.input}});
        expect(componentTree.state(args.input)).toBe('test');
        done();
    }, [
        ['input'],
        ['newPassword'],
        ['confirmPassword']
    ]);

    describe('When submit button is clicked.', (): void => {
        
        beforeEach(() => {
            componentTree.setState({
                newPassword: '', 
                confirmPassword: '', 
                newPasswordError: null,
                confirmPasswordError: null,
                passwordChanged: false,
                errorMessage: ''
            });
        });

        unroll('It should not submit the form when #testInput is empty', (
                done: () => void, 
                args: {testInput: string, otherInput: string}
        ): void => {
            componentTree.find(`#${args.testInput}`).simulate('change', {target: {value: '', id: args.testInput}});
            componentTree.find(`#${args.otherInput}`).simulate('change', {target: {value: 'www', id: args.otherInput}});
            componentTree.find(`#resetPaswordForm`).simulate('submit', {preventDefault: () => {}});
            expect(componentTree.state(`${args.testInput}Error`)).toBe('error');
            done();
        }, [
            ['testInput', 'otherInput'],
            ['newPassword', 'confirmPassword'],
            ['confirmPassword', 'newPassword']
        ]);

        it('It should not submit the form when the passwords are different in both the fields.', (): void => {
            componentTree.setState({newPassword: 'test1', confirmPassword: 'test2'});
            componentTree.find(`#resetPaswordForm`).simulate('submit', {preventDefault: () => {}});
            expect(componentTree.state(`passwordChanged`)).toBeFalsy();
            expect(componentTree.state(`errorMessage`)).toBe('Passwords do not match.');
        });
    });

    describe('It should submit form successfully when the passowrds are equal.', (): void => {

        beforeEach((): void => {
            componentTree.setState({newPassword: 'test', confirmPassword: 'test'});
            componentTree.find(`#resetPaswordForm`).simulate('submit', {preventDefault: () => {}});
        });

        it('It should go to success page when the request was fulfilled', (): PromiseLike<void> => {
            return UserModel.resetPassword(testPath, testToken, testEmail)
                        .then((): void => {
                            expect(componentTree.state('passwordChanged')).toBeTruthy();
                            expect(componentTree.state('errorMessage')).toEqual('');
                            expect(browserHistory.push).toBeCalledWith(testPath);
                        });
        });
    });

});
