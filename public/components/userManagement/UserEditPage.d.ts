import * as React from 'react';
import { IInstancePageProps } from 'react-hero';
import { UserModel } from '../../models/UserModel';
import { CSS } from '../../interfaces';
export interface IUserEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: UserModel) => void;
    instance: UserModel;
    submitButtonStyle?: CSS;
    cancelButtonStyle?: CSS;
    gridStyle?: CSS;
    formContainerStyle?: CSS;
}
export declare class UserEditPage extends React.Component<IUserEditPageProps, void> {
    static resourceName: string;
    fetchStoreInstance: () => UserModel;
    handleSubmit: (e: React.FormEvent) => void;
    render(): JSX.Element;
}
