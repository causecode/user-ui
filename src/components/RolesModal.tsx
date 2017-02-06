import * as React from 'react';
import * as Radium from 'radium';
import {Modal, Row, Button, Checkbox} from './ReusableComponents';
import {connect, MapStateToProps} from 'react-redux';
import {CSS, IState} from '../interfaces';
import {UserModel} from '../models/UserModel';
import {toggleRolesListModal} from '../utils';
import {rolesList} from '../constants';

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

let mapStateToProps: MapStateToProps<IState, IRolesModalProps> = (state: IState): IRolesModalProps => {
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
