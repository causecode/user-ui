jest.unmock('../../../src/components/modals/RolesModal');
jest.mock('../../../src/utils');

import * as React from 'react';
import {shallow, ShallowWrapper, mount, ReactWrapper} from 'enzyme';
import {toggleRolesListModal} from '../../../src/utils';
import {configureStore, HTTP} from 'react-hero';
import {UserModel} from '../../../src/models/UserModel';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import {IAccessOptions} from '../../../src/interfaces';
import {
    RolesModalImpl,
    IRolesModalProps,
    RolesModal,
    IRolesModalState
} from '../../../src/components/modals/RolesModal';

const unroll: any = require<any>('unroll');
unroll.use(it);

describe('ConfirmationModal tests.', (): void => {

    HTTP.postRequest = jest.fn((addToExisting: boolean, userIds: number[], roleIds: string[]) => {
        return new Promise((resolve, reject): void => {
            if (addToExisting) {
                resolve({success: true});
            } else {
                reject({error: {data: {message: 'Unable to process request.'}}});
            }
        });
    });

    const componentTree: ShallowWrapper<IRolesModalProps, IRolesModalState> =
            shallow<IRolesModalProps, IRolesModalState>(

            <RolesModalImpl
                    visibility={true}
                    recordsSelected={5}
                    selectedIds={[101, 201, 301]}
                    selectAll={false}
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
        ['Modal', 1],
        ['Row', 2],
        ['div', 1],
        ['Button', 2],
    ]);

    unroll('It should #operation #userRole to the state when it is  #checkboxAction', (
            done: () => void,
            args: {
                id: number,
                userRole: string,
                operation: string,
                checkboxAction: string,
                idsInStateBeforeChange: number[],
                idsInStateAfterChange: number[]
            }
        ): void => {

        expect(componentTree.state('selectedRoles')).toEqual(args.idsInStateBeforeChange);
        componentTree.find(`#${args.id}`).simulate('change', {target: {id: args.id}});
        expect(componentTree.state('selectedRoles')).toEqual(args.idsInStateAfterChange);
        done();
    }, [
        ['id', 'userRole', 'operation', 'checkboxAction', 'idsInStateBeforeChange', 'idsInStateAfterChange'],
        [6, 'EMPLOYEE', 'add', 'checked', [], [6]],
        [2, 'ADMIN', 'add', 'checked', [6], [6, 2]],
        [6, 'EMPLOYEE', 'remove', 'unchecked', [6, 2], [2]]
    ]);

    it('It should handle the checkbox: Add To Existing Roles on change.', (): void => {
        expect(componentTree.state('addToExistingRoles')).toEqual(true);
        componentTree.find('#addToExistingRoles').simulate('change');
        expect(componentTree.state('addToExistingRoles')).toEqual(false);
    });

    it('It should hide the roles modal when the the roles list is submitted to the server successfully.', () => {
        componentTree.find('#submit').simulate('click');
        return UserModel.modifyRoles(true, [101, 201, 301], ['2'])
                    .then(() => {
                        expect(toggleRolesListModal).toBeCalledWith(false);
                    });

    });

    unroll('Should render Roles checklist when #condition', (
        done: () => {},
        args: {condition: string, rolesList: IAccessOptions[], count: number}
    ): void => {
        componentTree.setProps({roleList: args.rolesList});
        expect(componentTree.find('Checkbox').length).toBe(args.count);
        done();
    }, [
        ['condition', 'rolesList', 'count'],
        ['Roles are passed as a prop', [{id: 1, authority: 'ROLE_TEST'}, {id: 2, authority: 'ROLE_TEST'}], 3],
        ['Roles are not passed as a prop', null, 15],
    ]);

    it('It should mount the component correctly when connected to the store.', (): void => {
        const connectedComponent: ReactWrapper<IRolesModalProps, IRolesModalState> =
                mount<IRolesModalProps, IRolesModalState>(

                <Provider store={configureStore({
                    modalVisibility: fromJS({rolesModal: true}),
                    userAction: {records: 5},
                    checkbox: {selectedIds: [101, 201, 301], selectAll: false}
                })}>
                    <RolesModal/>
                </Provider>
        );

        expect(connectedComponent.find(RolesModal).length).toEqual(1);
    });
});
