jest.unmock('../../src/actions/userAction');

import * as Actions from '../../src/actions/userAction';
import {IGenericAction, ILoggedinData, IUserAction, IUserBasicData} from '../../src/interfaces';
import {
    LOGIN_SUCCESS, 
    SAVE_LOGGED_IN_USER_DATA, 
    CLEAR_LOGGED_IN_USER_DATA, 
    SAVE_LOGIN_ERROR_MESSAGE,
    SAVE_BASIC_DATA,
    DELETE_BASIC_DATA,
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
    let dummyUserData: IUserBasicData = {
        id: 1,
        email: 'dummy@example.com',
        username: 'dummy.user',
        firstName: 'dummy',
        lastName: 'doe',
        gender: 'male',
        birthdate: '12/03/2017',
    };

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

    let expectedActionToSaveBasicData: IUserAction = {
        type: SAVE_BASIC_DATA,
        payload: dummyUserData,
    };

    unroll('should create an action for #title', (done: () => void, args: IUnrollArgs): void => {
        expect(Actions[args.actionName](...args.params)).toEqual(args.expectedAction);
        done();
    }, [
        ['title', 'actionName', 'expectedAction', 'params'],
        ['login', 'loginSuccess', {type: LOGIN_SUCCESS}, null],
        ['logout', 'clearLoggedInUserData', {type: CLEAR_LOGGED_IN_USER_DATA}, null],
        ['saving the logged in user data', 'saveLoggedInUserData', expectedActionToSaveUserData, [userRoles, username]],
        ['save the login error message', 'saveLoginErrorMessage', expectedActionOnLoginError, [dummyErrorMessage]],
        ['save the basic user data', 'saveBasicData', expectedActionToSaveBasicData, [dummyUserData]],
        ['deleting basic user data', 'deleteBasicData', {type: DELETE_BASIC_DATA}, null],
    ]);
});
