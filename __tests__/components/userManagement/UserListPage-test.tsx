jest.unmock('../../../src/components/userManagement/UserListPage');
jest.mock('../../../src/utils');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {UserListPageImpl, IUserListProps} from '../../../src/components/userManagement/UserListPage';
import {userModelInstance} from '../../testData/userManagementData';
import {UserModel} from '../../../src/models/UserModel';
import {ModelService} from 'react-hero';
import {store} from '../../../src/store';

const unroll: any = require<any>('unroll');
unroll.use(it);

/**
 * TODO: Revisit this test file to figure out a way to increase the percentage of the branches covered.
 */
export interface IShallowWrapperProps extends IUserListProps {
    children?: any;
}

describe('UserListPage Tests.', (): void => {

    store.dispatch = jest.fn();
    
    ModelService.getModel = jest.fn(() => {
        return UserModel;
    });

    const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            <UserListPageImpl
                    resource={UserListPageImpl.resourceName}
                    instanceList={[userModelInstance]}
                    totalCount={1}
                    properties={UserModel.columnNames}
                    action="list"
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
        ['div', 1],
        ['h2', 1],
        ['Row', 1],
        ['Col', 1],
        ['span', 1],
        ['DropDownFilter', 2]
    ]);

    it('It should fetch the instance list on mount.', (): void => {
        expect(ModelService.getModel).toBeCalled();
    });
});
