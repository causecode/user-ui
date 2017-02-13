jest.unmock('../../src/components/ErrorMessage');
jest.mock('../../src/interfaces');

import * as React from 'react';
import {ErrorMessage, IErrorMessageProps, errorMessage} from '../../src/components/ErrorMessage';
import {shallow, ShallowWrapper} from 'enzyme';

describe('ErrorMessage Tests', (): void => {
    let testMessage: string = 'some string';

    describe('When the prop is provided.', (): void => {
        const componentTree: ShallowWrapper<IErrorMessageProps, void> = shallow<IErrorMessageProps, void>(
                <ErrorMessage message={testMessage}/>
        );

        it('It should render the error message.', (): void => {
            expect(componentTree.find('div').length).toBe(1);
            expect(componentTree.prop('children')).toBe(testMessage);
            expect(componentTree.prop('style')).toEqual(errorMessage);
        });
    });

    describe('When the prop is not provided.', (): void => {
        const componentTree: ShallowWrapper<IErrorMessageProps, void> = shallow<IErrorMessageProps, void>(
                <ErrorMessage/>
        );

        it('It should render an empty string.', (): void => {
            expect(componentTree.find('div').length).toBe(1);
            expect(componentTree.prop('children')).toBe('');
            expect(componentTree.prop('style')).toEqual(errorMessage);
        });
    });
});
