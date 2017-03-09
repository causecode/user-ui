import {store, addReducers} from 'react-hero';
import {userManagementReducer} from '../reducers/index';

if (store.replaceReducer) {
    store.replaceReducer(addReducers(userManagementReducer));
}
export {store};
