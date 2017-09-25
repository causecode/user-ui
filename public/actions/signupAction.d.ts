import { ISignupAction, IGenericAction } from '../interfaces';
export declare const saveSignupFormData: (key: string, value: string) => ISignupAction;
export declare const updateSignupError: (payload: string) => IGenericAction;
