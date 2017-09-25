/// <reference types="react" />
/// <reference types="react-bootstrap" />
import * as React from 'react';
import { IAccessOptions } from '../../interfaces';
import { Checkbox as BootstrapCheckBox } from 'react-bootstrap';
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
    updateRoles: (event: React.FormEvent<BootstrapCheckBox>) => void;
    renderRolesChecklist: () => JSX.Element[];
    updateExistingRoleState: () => void;
    hideModal: () => void;
    handleSubmit: () => void;
    render(): JSX.Element;
}
declare let RolesModal: React.ComponentClass<IRolesModalProps>;
export { RolesModal };
