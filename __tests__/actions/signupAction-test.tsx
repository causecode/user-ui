jest.unmock('../../src/actions/signupAction');

import * as Actions from '../../src/actions/signupAction';
import {SAVE_INPUT_VALUE, UPDATE_SIGNUP_ERROR_MESSAGE} from '../../src/constants';
import {IGenericAction} from '../../src/interfaces';
import {IUnrollArgs} from './userAction-test';

const unroll: any = require<any>('unroll');
unroll.use(it);

describe('Tests for signupAction.', (): void => {

    let testKey: string = 'username';
    let testValue: string = 'dummy.name';
    let dummyErrorMessage: string = 'This is a test error message';

    let expectedActionToSaveSignupData: {type: string, payload: {key: string, value: string}} = {
        type: SAVE_INPUT_VALUE,
        payload: {
            key: testKey,
            value: testValue
        }
    };

    let expectedActionToUpdateError: IGenericAction = {
        type: UPDATE_SIGNUP_ERROR_MESSAGE,
        payload: dummyErrorMessage
    };

    unroll('It should create an action to #title', (done: () => void, args: IUnrollArgs): void => {
        expect(Actions[args.actionName](...args.params)).toEqual(args.expectedAction);
        done();
    }, [
        ['title', 'actionName', `expectedAction`, 'params'],
        ['save the signup data', 'saveSignupFormData', expectedActionToSaveSignupData, [testKey, testValue]],
        ['update the signup error', 'updateSignupError', expectedActionToUpdateError, [dummyErrorMessage]]
    ]);
});
