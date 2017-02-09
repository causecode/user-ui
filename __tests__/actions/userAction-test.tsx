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

describe('Tests for userAction.', () => {

    let userRoles: string[] = ['ROLE_TEST', 'ROLE_USER'];
    let username: string = 'dummy.name';
    let dummyErrorMessage: string = 'This is a test error message';

    let expectedActionToSaveLoggedInUserData: ILoggedinData = {
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

    unroll('It should create an action on #title', (done, args) => {
        expect(Actions[args.actionName]()).toEqual(args.expectedAction);
        done();
    }, [
        ['title', 'actionName', `expectedAction`],
        ['login', 'loginSuccess', {type: LOGIN_SUCCESS}],
        ['logout', 'clearLoggedInUserData', {type: CLEAR_LOGGED_IN_USER_DATA}]
    ]);

    unroll('It should create an action to #title', (done, args) => {
        expect(Actions[args.actionName](...args.params)).toEqual(args.expectedAction);
        done();
    }, [
        ['title', 'actionName', 'actionType', `expectedAction`, 'params'],
        ['save the logged in user data.', 'saveLoggedInUserData', SAVE_LOGGED_IN_USER_DATA, 
                expectedActionToSaveLoggedInUserData, [userRoles, username]],
        ['save the login error message.', 'saveLoginErrorMessage', SAVE_LOGIN_ERROR_MESSAGE, expectedActionOnLoginError,
                [dummyErrorMessage]]
    ]);
});
