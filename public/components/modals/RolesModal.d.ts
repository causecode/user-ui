import * as React from 'react';
export interface IRolesModalProps {
    visibility?: boolean;
    recordsSelected?: number;
    selectedIds?: number[];
    selectAll?: boolean;
}
export interface IRolesModalState {
    selectedRoles?: string[];
    addToExistingRoles?: boolean;
}
export declare class RolesModalImpl extends React.Component<IRolesModalProps, IRolesModalState> {
    constructor();
    updateRoles: (event: React.FormEvent) => void;
    renderRolesChecklist: () => JSX.Element[];
    updateExistingRoleState: () => void;
    hideModal: () => void;
    handleSubmit: () => void;
    render(): JSX.Element;
}
declare let RolesModal: React.ComponentClass<IRolesModalProps>;
export { RolesModal };
