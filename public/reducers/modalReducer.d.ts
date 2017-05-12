import { IFromJS } from 'react-hero';
export interface IActions {
    type: string;
    payload: boolean;
}
export declare const initialState: IFromJS;
export declare const modalReducer: (state: IFromJS, action: IActions) => IFromJS;
