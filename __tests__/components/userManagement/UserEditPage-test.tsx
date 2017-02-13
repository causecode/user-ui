jest.unmock('../../../src/components/userManagement/UserEditPage');
jest.mock('../../../src/models/UserModel');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {UserEditPage, IUserEditPageProps} from '../../../src/components/userManagement/UserEditPage';
import {userModelInstance} from '../../testData/userManagementData';
import {UserModel} from '../../../src/models/UserModel';
import {store, IFromJS} from 'react-hero';
import {fromJS} from 'immutable';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IShallowWrapperProps extends IUserEditPageProps {
    children?: any;
}

describe('UserEditPage Tests.', (): void => {

    let handleSubmit = jest.fn((instance: UserModel): void => {});
    const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            <UserEditPage
                    instance={userModelInstance}
                    handleSubmit={handleSubmit}
            />
    );

    let formData: {rhForms: {instanceKey: {properties: UserModel}}} = {
        rhForms: {
            instanceKey: {
                properties: userModelInstance
            }
        }
    };

    store.getState = jest.fn((): IFromJS => {
        return fromJS({form: formData});
    });

    unroll('It should render #elementName elements.', (
            done: () => void,
            args: {elementName: string, count: number}
    ): void => {
        expect(componentTree.find(args.elementName).length).toBe(args.count);
        done();
    }, [
        ['elementName', 'count'],
        ['div', 1],
        ['form', 1],
        ['Grid', 1],
        ['FormGroup', 1],
        ['Col', 1],
        ['Button', 1],
        ['Link', 1]
    ]);

    it('It should update the instance on submit.', (): void => {
        componentTree.find('form').simulate('submit', {preventDefault: (): void => {}});
        expect(handleSubmit).toBeCalled();
        expect(store.getState).toBeCalled();
    });
});
