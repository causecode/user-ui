import {TOGGLE_CONFIRMATION_MODAL, TOGGLE_ROLES_LIST_MODAL} from '../constants';
import {IFromJS} from 'react-hero';
import {fromJS} from 'immutable';

export interface IActions {
    type: string;
    payload: boolean;
}

export const initialState: IFromJS = fromJS({
    confirmationModal: false,
    rolesModal: false
});

export const modalReducer = (state: IFromJS = initialState, action: IActions): IFromJS => {
    switch (action.type) {
        case TOGGLE_CONFIRMATION_MODAL:
            return state.set('confirmationModal', action.payload);

        case TOGGLE_ROLES_LIST_MODAL:
            return state.set('rolesModal', action.payload);
    
        default:
            return state;
    }
};
