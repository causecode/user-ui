import * as React from 'react';
import * as Radium from 'radium';
import {Modal, Row, Col, Button, Checkbox} from './ReusableComponents';
import {connect, MapStateToProps} from 'react-redux';
import {CSS} from '../interfaces';
import {UserModel} from '../models/UserModel';
import {toggleRolesListModal} from '../utils';

export interface IRolesModalProps {
    visibility?: boolean;
    recordsSelected?: number;
    selectedIds?: number[];
    selectAll?: boolean;
}

export interface IRolesModalStates {
    selectedRoles?: string[];
    addToExistingRoles?: boolean;
}

@Radium
export class RolesModalImpl extends React.Component<IRolesModalProps, IRolesModalStates> {

    constructor() {
        super();
        this.state = {selectedRoles: [], addToExistingRoles: false};
    }

    updateRoles = (event: React.FormEvent): void => {
        let oldRolesState: string[] = this.state.selectedRoles;
        let newRole: string = event.target[`id`];
        let wasCheckedBefore: number = oldRolesState.indexOf(newRole);

        if (wasCheckedBefore > -1) {
            oldRolesState.splice(wasCheckedBefore, 1);
        } else {
            oldRolesState.push(newRole);
        }

        this.setState({selectedRoles: oldRolesState});
    }

    getRolesChecklist = (): JSX.Element[] => {
        const rolesList: {id: number, value: string}[] = [
            {id: 1, value: 'ROLE_USER'},
            {id: 2, value: 'ROLE_ADMIN'},
            {id: 3, value: 'ROLE_CONTENT_MANAGER'},
            {id: 4, value: 'ROLE_JOB_BOARD_MANAGER'},
            {id: 5, value: 'ROLE_EMPLOYEE_MANAGER'},
            {id: 6, value: 'ROLE_EMPLOYEE'},
            {id: 7, value: 'ROLE_ACCELERATOR_USER'},
            {id: 8, value: 'ROLE_ACCELERATOR_JUDGE'},
            {id: 9, value: 'ROLE_ACCELERATOR_MENTOR'},
            {id: 10, value: 'ROLE_USER_RATER'},
            {id: 11, value: 'ROLE_CRM_MANAGER'},
            {id: 12, value: 'ROLE_USER_MANAGER'},
            {id: 13, value: 'ROLE_CRM_USER'},
            {id: 14, value: 'ROLE_HR'}
        ];

       return rolesList.map((item: {id: number, value: string}): JSX.Element => {
            return (
                    <Checkbox
                            id={`${item.id}`}
                            onChange={this.updateRoles}>
                        {item.value}
                    </Checkbox>
            );
        });
    }

    updateExistingRoleState = (): void => {
        let oldValue: boolean = this.state.addToExistingRoles;
        this.setState({addToExistingRoles: !oldValue});
    }

    hideModal = (): void => {
        toggleRolesListModal(false);
    }

    handleSubmit = (): void => {
        UserModel.modifyRoles(this.state.addToExistingRoles, this.props.selectedIds, this.state.selectedRoles);
        this.hideModal();
    }

    render(): JSX.Element {
        return (
            <Modal onHide={this.hideModal} show={this.props.visibility} backdrop="static">
                <Modal.Header>
                    Please select the roles:
                </Modal.Header>
                <Modal.Body>
                        <Row style={listStyle}>
                            {this.getRolesChecklist()}
                        </Row><hr/>
                        <Row style={listStyle}>
                            <Checkbox onChange={this.updateExistingRoleState}>
                                Add to existing roles
                            </Checkbox>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit} bsStyle="primary">Submit</Button>
                        <Button onClick={this.hideModal}>Cancel</Button>
                    </Modal.Footer>
            </Modal>
        );
    }
}

let mapStateToProps = (state): IRolesModalProps => {
    return {
        visibility: state.modalVisibility.toJS().rolesModal,
        recordsSelected: state.userAction.records,
        selectedIds: state.checkbox.selectedIds,
        selectAll: state.checkbox.selectAll,
    };
};

let RolesModal: React.ComponentClass<IRolesModalProps> = connect(mapStateToProps)(RolesModalImpl);
export {RolesModal};

const listStyle: CSS = {
    display: 'inline'
};
