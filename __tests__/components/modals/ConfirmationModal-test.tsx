jest.unmock('../../../src/components/modals/ConfirmationModal');
jest.mock('../../../src/models/UserModel');
jest.mock('../../../src/utils');

import * as React from 'react';
import {toggleConfirmationModal, toggleRolesListModal} from '../../../src/utils';
import {shallow, ShallowWrapper, mount, ReactWrapper} from 'enzyme';
import {configureStore} from 'react-hero';
import {UserModel} from '../../../src/models/UserModel';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import {
    ConfirmationModalImpl,
    IConfirmationModalProps,
    ConfirmationModal
} from '../../../src/components/modals/ConfirmationModal';

const unroll: any = require<any>('unroll');
unroll.use(it);

describe('ConfirmationModal tests.', (): void => {

    const componentTree: ShallowWrapper<IConfirmationModalProps, void> = shallow<IConfirmationModalProps, void>(
            <ConfirmationModalImpl
                    visibility={true}
                    actionName={'Export Report'}
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
        ['Row', 1],
        ['Col', 2],
        ['strong', 1],
        ['Button', 2]
    ]);

    unroll('It should send request to the server to #userAction when the user clicks on OK button.', (
                done: () => void,
                args: {userAction: string, functionName: (() => void)[], propValue: string}
            ): void => {

        componentTree.setProps({actionName: args.propValue});
        componentTree.find('#ok').simulate('click');
        args.functionName.forEach((item: () => void): void => {
            expect(item).toBeCalled();
        });
        done();
    }, [
        ['userAction', 'functionName', 'propValue'],
        ['export user report', [UserModel.exportUserReport], 'Export Report'],
        ['lock user accounts', [UserModel.lockUnlockUserAccounts], 'Lock account(s)'],
        ['unlock user accounts', [UserModel.lockUnlockUserAccounts], 'Unlock account(s)'],
        ['change user roles', [toggleConfirmationModal, toggleRolesListModal], 'Change role']
    ]);

    it('It should hide the modal when the user clicks on OK button and the action type is not matched.', (): void => {
        componentTree.setProps({actionName: 'testUserAction'});
        componentTree.find('#ok').simulate('click');
        expect(toggleConfirmationModal).toBeCalledWith(false);
    });

    it('It should handle the case when the prop: selectedIds is not valid.', (): void => {
        componentTree.setProps({actionName: 'Export Report', selectedIds: null});
        componentTree.find('#ok').simulate('click');
        expect(UserModel.exportUserReport).toBeCalledWith(false, '');
    });

    it('It should mount the component correctly when connected to the store.', (): void => {
        const connectedComponent: ReactWrapper<IConfirmationModalProps, void> = mount<IConfirmationModalProps, void>(
                <Provider store={configureStore({
                    modalVisibility: fromJS({confirmationModal: true}),
                    userAction: {action: 'Export Report', records: 5},
                    checkbox: {selectedIds: [101, 201, 301], selectAll: false}
                })}>
                    <ConfirmationModal/>
                </Provider>
        );

        expect(connectedComponent.find(ConfirmationModal).length).toEqual(1);
    });
});
