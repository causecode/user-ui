/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../interfaces';
import { IUserActionStateProps, BaseModel } from 'react-hero';
export interface IUserListDispatchProps {
    setPage?: (pageNumber: number, resource: string) => void;
}
export interface IUserListStateProps extends IUserActionStateProps {
    properties?: string[];
    instanceList?: BaseModel[];
    totalCount?: number;
    selectedIds?: number[];
}
export interface IUserListProps extends IUserListStateProps, IUserListDispatchProps {
    resource: string;
}
export declare class UserListPageImpl extends React.Component<IUserListProps, void> {
    static resourceName: string;
    private userActions;
    private pageTitle;
    render(): JSX.Element;
}
declare let UserListPage: React.ComponentClass<IUserListProps>;
export { UserListPage };
export declare const alertStyle: CSS;
