jest.unmock('../../src/components/ErrorMessage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {ErrorMessage, IErrorMessageProps} from '../../src/components/ErrorMessage';

describe('ErrorMessage Tests', () => {
    let testMessage: string = 'some string';

    const componentTree: ShallowWrapper<IErrorMessageProps, void> = shallow<IErrorMessageProps, void>(
            <ErrorMessage message={testMessage}/>
    );

    it('It should render the error message correctly.', () => {
        expect(componentTree.find('div').length).toBe(1);
        expect(componentTree.prop('children')).toBe(testMessage);
    });
});
