import * as React from 'react';
export interface IConfirmationModalProps {
    visibility?: boolean;
    actionName?: string;
    recordsSelected?: number;
    selectedIds?: number[];
    selectAll?: boolean;
}
export declare class ConfirmationModalImpl extends React.Component<IConfirmationModalProps, void> {
    handleAction: (event: React.FormEvent) => void;
    hideModal: () => void;
    render(): JSX.Element;
}
declare let ConfirmationModal: React.ComponentClass<IConfirmationModalProps>;
export { ConfirmationModal };
