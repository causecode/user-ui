jest.unmock('../../src/reducers/modalReducer');
jest.unmock('immutable');

import {TOGGLE_CONFIRMATION_MODAL, TOGGLE_ROLES_LIST_MODAL} from '../../src/constants';
import {modalReducer, IActions, initialState} from '../../src/reducers/modalReducer';
import {IFromJS} from 'react-hero';

const unroll: any = require<any>('unroll');
unroll.use(it);

interface IUnrollArgs {
    modalName: string;
    actionType: string;
}

describe('Tests for modalReducer.', (): void => {
    
    const getActionData = (type: string, payload: boolean): IActions => {
        return {
            type,
            payload
        };
    };

    it('It should throw an error when the state is not available', (): void => {
        expect((): void => { modalReducer(); }).toThrow();
    });

    it('It should return the initial value when the action type is invalid.', (): void => {
        expect(modalReducer(initialState, {type: 'TEST_ACTION_TYPE', payload: true})).toEqual(initialState);
    });

    unroll('It should toggle the #modalName', (done: () => void, args: IUnrollArgs): void => {
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
