jest.unmock('../../src/components/BasePage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {BasePage} from '../../src/components/BasePage';
import {StyleRoot} from 'radium';

export interface IShallowWrapperProps {
    children: JSX.Element;
}

describe('BasePage Tests', (): void => {
    let testString: string = 'some string';

    it('It renders the children correctly.', (): void => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            <BasePage>{testString}</BasePage>
        );
        expect(componentTree.props().children).toEqual(testString);
        expect(componentTree.find(StyleRoot).length).toBe(1);
    });
});
