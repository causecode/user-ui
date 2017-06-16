import { IGenericAction, ILoggedinData, IUserBasicData, IUserAction } from '../interfaces';
export declare const loginSuccess: () => IGenericAction;
export declare const saveLoggedInUserData: (userRoles: string[], username: string) => ILoggedinData;
export declare const clearLoggedInUserData: () => IGenericAction;
export declare const saveLoginErrorMessage: (errorMessage: string) => IGenericAction;
export declare const saveBasicData: (userRoles: string[], userBasicData: IUserBasicData) => IUserAction;
export declare const deleteBasicData: () => IUserAction;
