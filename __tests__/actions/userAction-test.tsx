jest.unmock('../../src/actions/userAction');

import * as Actions from '../../src/actions/userAction';
import {IGenericAction, ILoggedinData} from '../../src/interfaces';
import {
    LOGIN_SUCCESS, 
    SAVE_LOGGED_IN_USER_DATA, 
    CLEAR_LOGGED_IN_USER_DATA, 
    SAVE_LOGIN_ERROR_MESSAGE
} from '../../src/constants';

const unroll: any = require<any>('unroll');
unroll.use(it);

export interface IUnrollArgs {
    title: string;
    actionName: string;
    expectedAction: {
        type: string
    };
    params: string[];
}

describe('Tests for userAction.', (): void => {

    let userRoles: string[] = ['ROLE_TEST', 'ROLE_USER'];
    let username: string = 'dummy.name';
    let dummyErrorMessage: string = 'This is a test error message';

    let expectedActionToSaveUserData: ILoggedinData = {
        type: SAVE_LOGGED_IN_USER_DATA,
        payload: {
            username,
            roles: userRoles
        }
    };

    let expectedActionOnLoginError: IGenericAction = {
        type: SAVE_LOGIN_ERROR_MESSAGE,
        payload: dummyErrorMessage
    };

    unroll('It should create an action for #title', (done: () => void, args: IUnrollArgs): void => {
        expect(Actions[args.actionName](...args.params)).toEqual(args.expectedAction);
        done();
    }, [
        ['title', 'actionName', 'expectedAction', 'params'],
        ['login', 'loginSuccess', {type: LOGIN_SUCCESS}, null],
        ['logout', 'clearLoggedInUserData', {type: CLEAR_LOGGED_IN_USER_DATA}, null],
        ['saving the logged in user data', 'saveLoggedInUserData', expectedActionToSaveUserData, [userRoles, username]],
        ['save the login error message', 'saveLoginErrorMessage', expectedActionOnLoginError, [dummyErrorMessage]]
    ]);
});
