jest.unmock('../../src/actions/modalAction');

import {TOGGLE_ROLES_LIST_MODAL, TOGGLE_CONFIRMATION_MODAL} from '../../src/constants';
import {changeModalVisibility} from '../../src/actions/modalAction';
import {IGenericAction} from '../../src/interfaces';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for modalAction.', () => {

    let expectedAction = (type: string, visibility: boolean): IGenericAction => {
        return {
            type,
            payload: visibility
        };
    };

    unroll('It should create an action to toggle #modalName', (done, args) => {
        expect(changeModalVisibility(args.actionType, true)).toEqual(args.expectedAction);
        done();
    }, [
        ['modalName', 'actionType', `expectedAction`],
        ['ConfirmationModal.', TOGGLE_CONFIRMATION_MODAL, expectedAction(TOGGLE_CONFIRMATION_MODAL, true)],
        ['RolesModal', TOGGLE_ROLES_LIST_MODAL, expectedAction(TOGGLE_ROLES_LIST_MODAL, true)]
    ]);
    
});
