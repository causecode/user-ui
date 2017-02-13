jest.unmock('../../src/reducers/signupReducer');

import {SAVE_INPUT_VALUE, UPDATE_SIGNUP_ERROR_MESSAGE} from '../../src/constants';
import {signupReducer, initialState} from '../../src/reducers/signupReducer';
import {ISignupAction} from '../../src/interfaces';
import {IFromJS} from 'react-hero';

const unroll: any = require<any>('unroll');
unroll.use(it);

interface IUnrollArgs {
    title: string;
    actionData: ISignupAction;
    key: string;
    value: string;
}

describe('Tests for signupReducer.', (): void => {

    let key: string = 'username';
    let value: string = 'dummy.name';
    let errorMessage: string = 'This is a test message';

    const getActionData = (type: string, payload: {key: string, value: string}): ISignupAction => {
        return {
            type,
            payload
        };
    };

    it('It should throw an error when the state is not available', (): void => {
        expect((): void => { signupReducer(); }).toThrow();
    });

    it('It should return the initial value.', (): void => {
        expect(signupReducer(initialState, getActionData('TEST_ACTION_TYPE', {key, value}))).toEqual(initialState);
    });

    unroll('It should save the signup #title to the store.', (done: () => void, args: IUnrollArgs): void => {
        let result: IFromJS = signupReducer(initialState, args.actionData);
        expect(result.get(`${args.key}`)).toEqual(args.value);
        done();
    }, [
        ['title', 'actionData', 'key', 'value'],
        ['form data', getActionData(SAVE_INPUT_VALUE, {key: key, value: value}), key, value],
        ['error message', {type: UPDATE_SIGNUP_ERROR_MESSAGE, payload: errorMessage}, 'signupErrorMessage', 
                errorMessage]
    ]);
});
