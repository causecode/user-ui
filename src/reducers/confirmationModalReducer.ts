import {TOGGLE_CONFIRMATION_MODAL} from '../constants/index';

export const confirmationModalReducer = (state: boolean = false, action: {type: string}): boolean => {
    switch (action.type) {
        case TOGGLE_CONFIRMATION_MODAL:
            return !state;
    
        default:
            return state;
    }
};
