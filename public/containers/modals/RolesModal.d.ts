/// <reference types="react" />
import * as React from 'react';
import { CheckboxProps } from 'react-bootstrap';
import { IAccessOptions } from '../../interfaces';
export interface IRolesModalProps {
    visibility?: boolean;
    recordsSelected?: number;
    selectedIds?: number[];
    selectAll?: boolean;
    roleList?: IAccessOptions[];
}
export interface IRolesModalState {
    selectedRoles?: string[];
    addToExistingRoles?: boolean;
}
export declare class RolesModalImpl extends React.Component<IRolesModalProps, IRolesModalState> {
    constructor();
    updateRoles: (event: React.FormEvent<CheckboxProps>) => void;
    renderRolesChecklist: () => JSX.Element[];
    updateExistingRoleState: () => void;
    hideModal: () => void;
    handleSubmit: () => void;
    render(): JSX.Element;
}
declare let RolesModal: React.ComponentClass<IRolesModalProps>;
export { RolesModal };
