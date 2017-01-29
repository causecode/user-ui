import {addReducers} from 'react-hero';
import {signupReducer} from './signupReducer';
import {confirmationModalReducer} from './confirmationModalReducer';
import {userReducer} from './userReducer';

export const reducer = addReducers({
    signupData: signupReducer,
    showConfirmationModal: confirmationModalReducer,
    currentUser: userReducer
});
