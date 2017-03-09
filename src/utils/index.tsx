import {changeModalVisibility} from '../actions/modalAction';
import {saveSignupFormData} from '../actions/signupAction';
import {store} from '../store';
import {
    TOGGLE_CONFIRMATION_MODAL,
    TOGGLE_ROLES_LIST_MODAL
} from '../constants';

export const handleSignupInput = (key: string, value: string): void => {
    dispatchToStore(saveSignupFormData(key, value));
};

export const toggleConfirmationModal = (visible: boolean): void => {
    dispatchToStore(changeModalVisibility(TOGGLE_CONFIRMATION_MODAL, visible));
};

export const toggleRolesListModal = (visible: boolean): void => {
    dispatchToStore(changeModalVisibility(TOGGLE_ROLES_LIST_MODAL, visible));
};

// Type `any` is assigned because `dispatchToStore` is a generic function.
export const dispatchToStore = (...actions: any[]): void => {
    actions.forEach((action: any) => {
        store.dispatch(action);
    });
};

export const showConfirmationModal = (): void => {
    toggleConfirmationModal(true);
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
