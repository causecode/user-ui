import {IGenericAction} from '../interfaces';

export const changeModalVisibility = (type: string, visible: boolean): IGenericAction => {
    return {
        type: type,
        payload: visible
    };
};
