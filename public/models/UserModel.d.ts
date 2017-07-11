import { History } from 'history';
import { IAxiosResponse, ISignupData, ILoginData, IUserBasicData } from '../interfaces';
import { BaseModel, ModelPropTypes } from 'react-hero';
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateCreated?: Date;
    lastUpdated?: Date;
    birthdate?: Date;
}
export interface IUserDataResponse {
    userInstance: IUserBasicData;
    userRoles: number[];
    roleList: {
        id: number;
        authority: string;
    }[];
}
export declare class UserModel extends BaseModel {
    static propTypes: {
        id: ModelPropTypes.IModelPropType;
        firstName: ModelPropTypes.IModelPropType;
        lastName: ModelPropTypes.IModelPropType;
        email: ModelPropTypes.IModelPropType;
        birthdate: ModelPropTypes.IModelPropType;
    };
    static defaultProps: {
        firstName: string;
        lastName: string;
        email: string;
        dateCreated: string;
        birthdate: string;
    };
    static resourceName: string;
    static columnNames: string[];
    getHTMLBirthdate(properties: IUser): JSX.Element;
    static login(requestUrl: string, requestData: ILoginData, successUrl: string, history: History, getUserData?: boolean): void;
    static getUserData(history: History): void;
    static logout(requestUrl: string, history: History): void;
    static signup(requestUrl: string, requestData: ISignupData, successUrl: string, history: History): void;
    static exportUserReport(selectAll: boolean, selectedIds: string): void;
    static lockUnlockUserAccounts(lockAccount: boolean, selectedIds: number[]): void;
    static modifyRoles(addToExisting: boolean, userIds: number[], roleIds: string[]): Axios.IPromise<IAxiosResponse>;
    static forgotPassword(url: string, email: string): Axios.IPromise<IAxiosResponse>;
    static resetPassword(url: string, token: string, email: string, password: string, password2: string): Axios.IPromise<IAxiosResponse>;
    constructor(properties: IUser);
}
