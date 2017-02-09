jest.unmock('../../../src/components/signup/SignupPanel');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {SignupPanel, ISignupPanelProps} from '../../../src/components/signup/SignupPanel';
import {Provider} from 'react-redux';
import {CSS, ISignupData} from '../../../src/interfaces';
import {store} from '../../../src/store';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends ISignupPanelProps {
    children?: any;
}

describe('SignupPanel Tests', () => {

    let testPath: string = 'http://some/path';
    let testStyle: CSS = {textAlign: 'center'};
    let testKey: string = 'qwertyuipoi09876';
    let testString: string = 'This is a test string';

    let dummyUserData: ISignupData = {
        firstname: testString,
        lastname: testString,
        email: testString,
        username: testString
    };

    describe('When only the mandatory props are passed.', () => {

        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
                <Provider store={store}>
                    <SignupPanel
                            onSubmitUrl={testPath}
                            onLoginUrl={testPath}
                            onSuccess={testPath}
                            recaptchaSiteKey={testKey}
                    />
                </Provider>
        );

        unroll('It should render #elementName elements.', (done, args) => {
            expect(componentTree.find(args.elementName)).toBeTruthy();
            done();
        }, [
            ['elementName'],
            ['div'],
            ['Panel'],
            ['ErrorMessage'],
            ['PanelFooter'],
            ['PanelHeader']
        ]);

        unroll('It should render #prop correctly.', (done, args) => {
            expect(componentTree.props()[args.prop]).toBe(args.value);
            done();
        }, [
            ['prop', 'value'],
            ['onSubmitUrl', testPath],
            ['onLoginUrl', testPath],
            ['onSuccess', testPath],
            ['recaptchaSiteKey', testKey]
        ]);
    });

    describe('When all the props are passed.', () => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
                <Provider>
                    <SignupPanel
                            onSubmitUrl={testPath}
                            onLoginUrl={testPath}
                            onSuccess={testPath}
                            recaptchaSiteKey={testKey}
                            panelTitle={testString}
                            userData={dummyUserData}
                            inputStyle={testStyle}
                            signupContainerStyle={testStyle}
                            panelTitleStyle={testStyle}
                            signupOptionsButtonStyle={testStyle}
                    />
                </Provider>
        );

        unroll('It should render the prop: #prop correctly.', (done, args) => {
            expect(componentTree.props()[args.prop]).toBe(args.value);
            done();
        }, [
            ['prop', 'value'],
            ['onSubmitUrl', testPath],
            ['onLoginUrl', testPath],
            ['onSuccess', testPath],
            ['recaptchaSiteKey', testKey],
            ['panelTitle', testString],
            ['userData', dummyUserData],
            ['inputStyle', testStyle],
            ['signupContainerStyle', testStyle],
            ['panelTitleStyle', testStyle]
        ]);
    });
});
