jest.unmock('../../src/components/PanelFooter');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {PanelFooter, IPanelFooterProps} from '../../src/components/PanelFooter';
import {CSS} from '../../src/interfaces';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends IPanelFooterProps {
    children?: any;
}

describe('PanelFooter Tests', () => {

    let testString: string = 'some string';
    let testStyle: CSS = {textAlign: 'center'};

    describe('When only the Submit button is rendered and the it is of the type: "submit".', () => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
                <PanelFooter
                        showOnlySubmitButton
                        submitForm
                        submitButtonContent={testString}
                        submitButtonStyle={testStyle}
                />
        );

        unroll('It should render #count #elementName elements.', (done, args) => {
            expect(componentTree.find(args.elementName).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'count'],
            ['div', 2],
            ['Button', 1]
        ]);

        unroll('It should render #prop correctly.', (done, args) => {
            expect(componentTree.instance().props[args.prop]).toBe(args.value);
            done();
        }, [
            ['prop', 'value'],
            ['showOnlySubmitButton', true],
            ['submitForm', true],
            ['submitButtonContent', testString],
            ['submitButtonStyle', testStyle]
        ]);

        it('It should apply type:"submit" prop to the Button.', () => {
            expect(componentTree.find('Button').props().type).toBe('submit');
            expect(componentTree.find('Button').props().onClick).toBeFalsy();
        });
    });

    describe('When only the Submit button is rendered and the it is not of the type: "submit".', () => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
                <PanelFooter
                        showOnlySubmitButton
                        onSubmit={() => {}}
                        submitButtonContent={testString}
                        submitButtonStyle={testStyle}
                />
        );

        unroll('It should render #count #elementName elements.', (done, args) => {
            expect(componentTree.find(args.elementName).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'count'],
            ['div', 2],
            ['Button', 1]
        ]);

        unroll('It should render #prop correctly.', (done, args) => {
            expect(componentTree.instance().props[args.prop]).toBe(args.value);
            done();
        }, [
            ['prop', 'value'],
            ['showOnlySubmitButton', true],
            ['submitForm', undefined],
            ['submitButtonContent', testString],
            ['submitButtonStyle', testStyle]
        ]);

        it('It should not apply type:"submit" prop to the Button.', () => {
            expect(componentTree.find('Button').props().type).toBeFalsy();
            expect(componentTree.find('Button').props().onClick).toBeTruthy();
        });
    });

    describe('When both the buttons are rendered.', () => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
                <PanelFooter
                        submitForm
                        submitButtonContent={testString}
                        submitButtonStyle={testStyle}
                        otherButtonContent={testString}
                        otherButtonStyle={testStyle}
                        otherButtonOnClick={() => {}}
                />
        );

        unroll('It should render #count #elementName elements.', (done, args) => {
            expect(componentTree.find(args.elementName).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'count'],
            ['div', 3],
            ['Button', 2]
        ]);

        unroll('It should render #prop correctly.', (done, args) => {
            expect(componentTree.instance().props[args.prop]).toBe(args.value);
            done();
        }, [
            ['prop', 'value'],
            ['showOnlySubmitButton', undefined],
            ['submitForm', undefined],
            ['submitButtonContent', testString],
            ['submitButtonStyle', testStyle],
            ['otherButtonContent', testString],
            ['otherButtonStyle', testStyle]
        ]);
    });
});
