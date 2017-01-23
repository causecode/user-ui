import {addReducers} from 'react-hero';
import {signupReducer} from './signupReducer';

export const reducer = addReducers({
    signupData: signupReducer
});
