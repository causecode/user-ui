jest.unmock('../../src/components/LoginPanel');
jest.mock('../../src/utils');
jest.mock('../../src/models/UserModel');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {LoginPanelImpl, ILoginPanelProps} from '../../src/components/LoginPanel';
import {UserModel} from '../../src/models/UserModel';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends ILoginPanelProps {
    children?: any;
}

describe('LoginPanel Tests.', (): void => {

    let testPath: string = 'http://some/path';
    let testString: string = 'This is a test string';

    describe('When remember me check box is not needed', (): void => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
                <LoginPanelImpl
                        onForgotPassword={testPath}
                        onLoginSuccess={testPath}
                        onSignup={testPath}
                        onSubmit={testPath}
                        isLoggedIn
                        errorMessage={testString}
                />
        );

        unroll('It should render #elementName elements.', (
                done: () => void,
                args: {elementName: string, count: number}
        ): void => {
            expect(componentTree.find(args.elementName).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'count'],
            ['div', 1],
            ['Panel', 1],
            ['ErrorMessage', 1],
            ['form', 1],
            ['FormGroup', 2],
            ['FormControl', 2],
            ['HelpBlock', 2]
        ]);

        it('It should not render the remember me check box.', (): void => {
            expect(componentTree.instance().props.showRememberMeCheckbox).toBeFalsy();
        });
    });

    describe('When remember me check box is needed and the form inputs are not empty.', (): void => {

        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
                <LoginPanelImpl
                        onForgotPassword={testPath}
                        onLoginSuccess={testPath}
                        onSignup={testPath}
                        onSubmit={testPath}
                        isLoggedIn
                        errorMessage={testString}
                        showRememberMeCheckbox={true}
                />
        );

        it('It should render the remember me check box.', (): void => {
            expect(componentTree.instance().props.showRememberMeCheckbox).toBeTruthy();
            expect(componentTree.state('rememberMe')).toBeFalsy();
            componentTree.find('#rememberMeCheckbox').simulate('change');
            expect(componentTree.state('rememberMe')).toBeTruthy();
        });

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
            ['email'],
            ['password']
        ]);

        unroll('It should save #input to the state when changed.', (done: () => void, args: {input: string}): void => {
            expect(componentTree.state(args.input)).toBe('');
            componentTree.find(`#${args.input}`).simulate('change', {target: {value: testString, id: args.input}});
            expect(componentTree.state(args.input)).toBe(testString);
            done();
        }, [
            ['input'],
            ['email'],
            ['password']
        ]);
        
        it('It should submit the form successfully when the values are valid.', (): void => {
            componentTree.find(`#loginForm`).simulate('submit', {preventDefault: () => {}});
            expect(UserModel.login).toBeCalled();
        });
    });

    describe('When the form inputs are empty.', () => {

        let componentTree: ShallowWrapper<IShallowWrapperProps, void>;

        beforeEach((): void => {
            componentTree = shallow<IShallowWrapperProps, void>(
                    <LoginPanelImpl
                            onForgotPassword={testPath}
                            onLoginSuccess={testPath}
                            onSignup={testPath}
                            onSubmit={testPath}
                            isLoggedIn
                            errorMessage={testString}
                            showRememberMeCheckbox={true}
                    />
            );
        });

        it('It should not submit the form when email and password fields are empty.', (): void => {
            componentTree.find(`#loginForm`).simulate('submit', {preventDefault: () => {}});
            expect(componentTree.state('emailError')).toBe('error');
            expect(componentTree.state('passwordError')).toBe('error');
        });

        unroll('It should not submit the form when #testInput is empty', (
                done: () => void, 
                args: {testInput: string, otherInput: string}
        ): void => {
            componentTree.find(`#${args.testInput}`).simulate('change', {target: {value: '', id: args.testInput}});
            componentTree.find(`#${args.otherInput}`).simulate('change', {target: {value: 'www', id: args.otherInput}});
            componentTree.find(`#loginForm`).simulate('submit', {preventDefault: () => {}});
            expect(componentTree.state(`${args.testInput}Error`)).toBe('error');
            done();
        }, [
            ['testInput', 'otherInput'],
            ['email', 'password'],
            ['password', 'email']
        ]);
    });
    
});
