jest.unmock('../../src/reducers/signupReducer');

import {SAVE_INPUT_VALUE, UPDATE_SIGNUP_ERROR_MESSAGE} from '../../src/constants';
import {signupReducer, initialState} from '../../src/reducers/signupReducer';
import {ISignupAction} from '../../src/interfaces';
import {IFromJS} from 'react-hero';

const unroll: any = require<any>('unroll');
unroll.use(it);

describe('Tests for signupReducer.', () => {

    let testKey: string = 'username';
    let testValue: string = 'dummy.name';
    let testErrorMessage: string = 'This is a test message';

    function getActionData(type: string, payload: {key: string, value: string}): ISignupAction {
        return {
            type,
            payload
        };
    }

    it('It should return the initial value.', () => {
        expect(signupReducer(initialState, {})).toEqual(initialState);
    });

    unroll('It should save the signup #title to the store.', (done, args) => {
        let result: IFromJS = signupReducer(initialState, args.actionData);
        expect(result.get(`${args.key}`)).toEqual(args.value);
        done();
    }, [
        ['title', 'actionData', 'key', 'value'],
        ['form data', getActionData(SAVE_INPUT_VALUE, {key: testKey, value: testValue}), testKey, testValue],
        ['error message', {type: UPDATE_SIGNUP_ERROR_MESSAGE, payload: testErrorMessage}, 'signupErrorMessage', 
                testErrorMessage]
    ]);

});
