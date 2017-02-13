jest.unmock('../../../src/components/signup/SignupPanel');
jest.mock('../../../src/utils');
jest.mock('../../../src/models/UserModel');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {SignupPanelImpl, ISignupPanelProps} from '../../../src/components/signup/SignupPanel';
import {ISignupData} from '../../../src/interfaces';
import {SignupForm} from '../../../src/components/signup/SignupForm';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends ISignupPanelProps {
    children?: any;
}

describe('SignupPanel Tests', (): void => {

    let testPath: string = 'http://some/path';
    let testKey: string = 'qwertyuipoi09876';
    let testString: string = 'This is a test string';

    let dummyUserData: ISignupData = {
        firstname: testString,
        lastname: testString,
        email: testString,
        username: testString
    };

    const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            <SignupPanelImpl
                    onSubmitUrl={testPath}
                    onLoginUrl={testPath}
                    onSuccess={testPath}
                    recaptchaSiteKey={testKey}
                    userData={dummyUserData}
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
        ['div', 2],
        ['Panel', 1],
        ['ErrorMessage', 1],
        ['Button', 1],
        ['FontAwesome', 1]
    ]);

    describe('When signup option is not selected.', (): void => {

        it('It should not render the signup form.', (): void => {
            expect(componentTree.state('displaySignupForm')).toBeFalsy();
            expect(componentTree.find(SignupForm).length).toBe(0);
        });
    });

    describe('When signup option is selected.', (): void => {

        it('It should render the signup form.', (): void => {
            expect(componentTree.state('displaySignupForm')).toBeFalsy();
            componentTree.find('#signupWithEmail').simulate('click');
            expect(componentTree.state('displaySignupForm')).toBeTruthy();
            expect(componentTree.find(SignupForm).length).toBe(1);
        });
    });
});
