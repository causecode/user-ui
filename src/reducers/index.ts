import {modalReducer} from './modalReducer';
import {signupReducer} from './signupReducer';
import {userReducer} from './userReducer';

export const userManagementReducer: Object = {
    signupData: signupReducer,
    modalVisibility: modalReducer,
    currentUser: userReducer
};
