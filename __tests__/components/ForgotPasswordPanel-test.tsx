jest.unmock('../../src/components/ForgotPasswordPanel');
jest.mock('../../src/utils');

import * as React from 'react';
import * as H from 'history';
import {shallow, ShallowWrapper} from 'enzyme';
import {match} from 'react-router';
import {IForgotPasswordPanelProps, ForgotPasswordPanelImpl} from '../../src/components/ForgotPasswordPanel';
import {UserModel} from '../../src/models/UserModel';
import {HTTP} from 'react-hero';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends IForgotPasswordPanelProps {
    children?: any;
}

describe('ForgotPasswordPanel Tests.', (): void => {

    let testPath: string = 'http://some/path';
    let testEmail: string = 'something@example.com';
    let componentTree: ShallowWrapper<IShallowWrapperProps, void>;
    let match: match<void>;
    let location: H.Location;
    let push: jest.Mock<void> = jest.fn<void>();
    /**
     * Using any here because, if exact type is used with createHistory() test case fails with a
     * SecurityError caused due to mismatching instances.
     * TODO: Figure out a way to use exact type for history and run the test cases
     */
    let history: any = {push};

    beforeEach(() => {
        HTTP.postRequest = jest.fn((url, {}, data: {email: string}): PromiseLike<{success?: boolean}> => {
                return new Promise((resolve, reject): void => {
                    if (data.email === testEmail) {
                        resolve({success: true});
                    } else {
                        reject('User not found.');
                    }
                });
            });

        componentTree = shallow<IShallowWrapperProps, void>(
                <ForgotPasswordPanelImpl
                        onSubmitUrl={testPath}
                        match={match}
                        location={location}
                        history={history}
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
        ['div', 1],
        ['Panel', 1],
        ['ErrorMessage', 1],
        ['form', 1],
        ['FormGroup', 2],
        ['FormControl', 1],
        ['HelpBlock', 1],
    ]);

    it('It should not submit form when the email value is not valid.', (): void => {
        expect(componentTree.state('email')).toBe('');
        componentTree.find('#email').simulate('change', {target: {value: ''}});
        expect(componentTree.state('email')).toBe('');
        componentTree.find('#forgotPasswordForm').simulate('submit', {preventDefault: () => {}});
        expect(componentTree.state('usernameError')).toEqual('error');
    });

    describe('It should submit form successfully when the email value is valid.', (): void => {

        beforeEach((): void => {
            expect(componentTree.state('email')).toBe('');
            componentTree.find('#email').simulate('change', {target: {value: testEmail}});
            expect(componentTree.state('email')).toBe(testEmail);
        });

        it('It should show success message when the request was fulfilled', (): PromiseLike<void> => {
            componentTree.find('#forgotPasswordForm').simulate('submit', {preventDefault: () => {}});
            return UserModel.forgotPassword(testPath, testEmail)
                        .then((): void => {
                            expect(componentTree.state('showInputField')).toBeFalsy();
                            expect(componentTree.state('errorMessage')).toEqual('');
                            
                            componentTree.find('#tryAgain').simulate('click');
                            unroll('It should set state to default', (done: () => void, args): void => {
                                expect(componentTree.state(args.stateName)).toEqual(args.defaultValue);
                                done();
                            }, [
                                ['stateName', 'defaultValue'],
                                ['email', ''],
                                ['usernameError', null],
                                ['errorMessage', ''],
                                ['showInputField', true],
                            ]);
                            
                        });
        });
    });

});
