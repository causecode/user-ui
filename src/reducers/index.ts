import {modalReducer} from './modalReducer';
import {signupReducer} from './signupReducer';
import {addReducers} from 'react-hero';
import {userReducer} from './userReducer';

export const reducer = addReducers({
    signupData: signupReducer,
    modalVisibility: modalReducer,
    currentUser: userReducer
});
