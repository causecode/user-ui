import {IGenericAction} from '../interfaces';
import {TOGGLE_CONFIRMATION_MODAL, TOGGLE_ROLES_LIST_MODAL} from '../constants';

export const changeConfirmationModalVisibility = (visible: boolean): IGenericAction => {
    return {
        type: TOGGLE_CONFIRMATION_MODAL,
        payload: visible
    };
};

export const changeRolesListModalVisibility = (visible: boolean): IGenericAction => {
    return {
        type: TOGGLE_ROLES_LIST_MODAL,
        payload: visible
    };    
};
