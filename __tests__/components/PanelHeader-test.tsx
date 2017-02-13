jest.unmock('../../src/components/PanelHeader');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {PanelHeader, IPanelHeaderProps} from '../../src/components/PanelHeader';
import {CSS} from '../../src/interfaces';

describe('PanelHeader Tests', (): void => {
    let testString: string = 'some string';
    let testStyle: CSS = {textAlign: 'center'};

    const componentTree: ShallowWrapper<IPanelHeaderProps, void> = shallow<IPanelHeaderProps, void>(
            <PanelHeader headerText={testString} headerStyle={testStyle}/>
    );
    
    componentTree.debug();
    it('It should render the panel header correctly.', (): void => {
        expect(componentTree.find('div').length).toBe(1);
        expect(componentTree.prop('children')).toEqual(testString);
        expect(componentTree.prop('style')).toEqual(testStyle);
    });
});
