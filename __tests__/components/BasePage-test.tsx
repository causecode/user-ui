jest.unmock('../../src/components/BasePage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {BasePage} from '../../src/components/BasePage';

export interface IShallowWrapperProps {
    children: JSX.Element;
}

describe('BasePage Tests', () => {
    let testString: string = 'some string';

    it('It renders the children correctly.', () => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            <BasePage>{testString}</BasePage>
        );
        expect(componentTree.props().children).toEqual(testString);
    });
});
