import * as React from 'react';
import { IInstancePageProps } from 'react-hero';
import { CSS } from '../../interfaces';
export interface IUserShowPageProps extends IInstancePageProps {
    tableStyles?: CSS;
}
export declare class UserShowPage extends React.Component<IUserShowPageProps, void> {
    static resourceName: string;
    render(): JSX.Element;
}
