jest.unmock('../../src/reducers/modalReducer');

import {TOGGLE_CONFIRMATION_MODAL, TOGGLE_ROLES_LIST_MODAL} from '../../src/constants';
import {modalReducer, IActions, initialState} from '../../src/reducers/modalReducer';
import {IFromJS} from 'react-hero';

const unroll: any = require<any>('unroll');
unroll.use(it);

describe('Tests for modalReducer.', () => {
    function getActionData(type: string, payload: boolean): IActions {
        return {
            type,
            payload
        };
    }

    it('It should return the initial value.', () => {
        expect(modalReducer(initialState, {})).toEqual(initialState);
    });

    unroll('It should toggle the #modalName', (done, args) => {
        let actionData: IActions = getActionData(args.actionType, true);
        let result: IFromJS = modalReducer(initialState, actionData);
        expect(result.get(args.modalName)).toEqual(true);
        done();
    }, [
        ['modalName', 'actionType'],
        ['confirmationModal', TOGGLE_CONFIRMATION_MODAL],
        ['rolesModal', TOGGLE_ROLES_LIST_MODAL]
    ]);
});
