/// <reference types="react" />
import * as React from 'react';
import { ButtonProps } from 'react-bootstrap';
export interface IConfirmationModalProps {
    visibility?: boolean;
    actionName?: string;
    recordsSelected?: number;
    selectedIds?: number[];
    selectAll?: boolean;
}
export declare class ConfirmationModalImpl extends React.Component<IConfirmationModalProps, void> {
    handleAction: (event: React.FormEvent<ButtonProps>) => void;
    hideModal: () => void;
    render(): JSX.Element;
}
declare let ConfirmationModal: React.ComponentClass<IConfirmationModalProps>;
export { ConfirmationModal };
