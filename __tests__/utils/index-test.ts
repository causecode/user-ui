jest.unmock('../../src/utils');

import * as Utils from '../../src/utils';
import {store} from '../../src/store';
const unroll: any = require('unroll');

unroll.use(it);

describe('Utils tests.', (): void => {
    
    store.dispatch = jest.fn<void>();

    it('should dispatch the action to the store.', (): void => {
        let testAction: jest.Mock<void> = jest.fn<void>();
        Utils.dispatchToStore(testAction());
        expect(store.dispatch).toBeCalledWith(testAction());
    });

    unroll('It should #title', (
            done: () => void,
            args: {title: string, params: (string | boolean)[], functionName: string}
    ): void => {
        Utils[args.functionName](...args.params);
        expect(store.dispatch).toBeCalled();
        done();
    }, [
        ['title', 'params', 'functionName'],
        ['save the signup form data to the store.', ['email', 'test@example.com'], 'handleSignupInput'],
        ['toggle confirmation modal.', [true], 'toggleConfirmationModal'],
        ['toggle roles list modal.', [true], 'toggleRolesListModal'],
    ]);

    it('should open the confirmation modal.', (): void => {
        Utils.toggleConfirmationModal = jest.fn<void>();
        Utils.showConfirmationModal();
        expect(Utils.toggleConfirmationModal).toBeCalledWith(true);
    });

    let rolesList: string[] = ['ROLE_USER', 'DUMMY_USER'];

    unroll('It should #operation the roles list in the local storage', (
            done: () => void,
            args: {operation: string, rolesList: string[]}
    ) => {    
        localStorage.setItem = jest.fn<void>();
        Utils.setRolesInLocalStorage(args.rolesList);
        if (args.rolesList.length > 0) {
            expect(localStorage.setItem).toBeCalled();
        } else {
            expect(localStorage.setItem).not.toBeCalled();
        }
        done();
    }, [
        ['operation', 'rolesList'],
        ['save', rolesList],
        ['not save', []],
    ]);

    Utils.setRolesInLocalStorage(rolesList);
    it('should return the roles list from the local storage.', (): void => {
        expect(Utils.getRolesFromLocalStorage()).toEqual(rolesList);
    });

    it('should remove the roles list from the local storage.', (): void => {
        localStorage.removeItem = jest.fn<void>();
        Utils.removeRolesFromLocalStorage();
        expect(localStorage.removeItem).toBeCalled();
    });
});
