jest.unmock('../../src/reducers/userReducer');

import {userReducer, initialState} from '../../src/reducers/userReducer';
import {IGenericAction} from '../../src/interfaces';
import {IFromJS} from 'react-hero';
import {
    LOGIN_SUCCESS, 
    SAVE_LOGGED_IN_USER_DATA, 
    CLEAR_LOGGED_IN_USER_DATA, 
    SAVE_LOGIN_ERROR_MESSAGE
} from '../../src/constants';

const unroll: any = require<any>('unroll');
unroll.use(it);

describe('Tests for userReducer.', (): void => {

    let testError: string = 'This is a test error message';
    let userData: {roles: string[], username: string} = {
        roles: ['ROLE_TEST', 'ROLE_USER'],
        username: 'dummy.name'
    };

    const getActionWithPayload = (type: string, payload): IGenericAction => {
        return {
            type,
            payload
        };
    }

    const getActionWithoutPayload = (type: string): IGenericAction => {
        return {
            type
        };
    };

    it('It should throw an error when the state is not available', (): void => {
        expect((): void => { userReducer(); }).toThrow();
    });

    unroll('It should return the initial value #title', (done: () => void, args): void => {
        expect(userReducer(initialState, args.actionData)).toEqual(initialState);
        done();
    }, [
        ['title', 'actionData'],
        ['by default.', {}],
        ['on logout', getActionWithoutPayload(CLEAR_LOGGED_IN_USER_DATA)]
    ]);

    let loginSuccess: IFromJS = userReducer(initialState, getActionWithoutPayload(LOGIN_SUCCESS));

    unroll('It should set #key to #value on succesful login.', (done: () => void, args): void => {
        expect(loginSuccess.get(args.key)).toEqual(args.value);
        done();
    }, [
        ['key', 'value'],
        ['isLoggedIn', true],
        ['hasLoginError', false],
        ['loginErrorMessage', '']
    ]);

    let loginFailure: IFromJS = userReducer(initialState, getActionWithPayload(SAVE_LOGIN_ERROR_MESSAGE, testError));

    unroll('It should set #key to #value on login failure.', (done: () => void, args): void => {
        expect(loginFailure.get(args.key)).toEqual(args.value);
        done();
    }, [
        ['key', 'value'],
        ['isLoggedIn', false],
        ['hasLoginError', true],
        ['loginErrorMessage', testError]
    ]);

    it('It should save the logged in user data to the store.', () => {
        let result: IFromJS = userReducer(initialState, getActionWithPayload(SAVE_LOGGED_IN_USER_DATA, userData));
        expect(result.get('userData')).toEqual(userData);
    });
});
