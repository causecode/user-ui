jest.unmock('../../src/components/BasePage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {BasePage} from '../../src/components/BasePage';

describe('BasePage Tests', () => {
    let testString: string = 'some string';

    it('It renders the children correctly.', () => {
        const componentTree: ShallowWrapper<{children: JSX.Element}, void> = shallow<{children: JSX.Element}, void>(
            <BasePage>{testString}</BasePage>
        );
        expect(componentTree.props().children).toEqual(testString);
    });
});
