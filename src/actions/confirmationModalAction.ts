import {IGenericAction} from '../interfaces';
import {TOGGLE_CONFIRMATION_MODAL} from '../constants';

export const changeConfirmationModalVisibility = (): IGenericAction => {
    return {
        type: TOGGLE_CONFIRMATION_MODAL
    };
};
