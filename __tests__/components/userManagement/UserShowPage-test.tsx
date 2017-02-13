jest.unmock('../../../src/components/userManagement/UserShowPage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {UserShowPage, IUserShowPageProps} from '../../../src/components/userManagement/UserShowPage';
import {userModelInstance} from '../../testData/userManagementData';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends IUserShowPageProps {
    children?: any;
}

describe('UserShowPage Tests.', (): void => {

    const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            <UserShowPage
                    instance={userModelInstance}
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
        ['Table', 1],
        ['thead', 1],
        ['tr', 7],
        ['th', 2],
        ['td', 12],
        ['tbody', 1]
    ]);
});
