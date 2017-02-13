import * as React from 'react';
import * as Radium from 'radium';
import {listStyle, listContainer, listItem} from '../../constants/palette';
import {Modal, Row, Button, Checkbox} from '../ReusableComponents';
import {IStateProps, IAxiosResponse} from '../../interfaces';
import {connect, MapStateToProps} from 'react-redux';
import {toggleRolesListModal} from '../../utils';
import {ErrorMessage} from '../ErrorMessage';
import {UserModel} from '../../models/UserModel';
import {rolesList} from '../../constants';

export interface IRolesModalProps {
    visibility?: boolean;
    recordsSelected?: number;
    selectedIds?: number[];
    selectAll?: boolean;
}

export interface IRolesModalState {
    selectedRoles?: string[];
    addToExistingRoles?: boolean;
    errorMessage?: string;
}

@Radium
export class RolesModalImpl extends React.Component<IRolesModalProps, IRolesModalState> {

    constructor() {
        super();
        this.state = {selectedRoles: [], addToExistingRoles: true, errorMessage: ''};
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

    renderRolesChecklist = (): JSX.Element[] => {
        return rolesList.map((item: {id: number, value: string}, index: number): JSX.Element => {
            return (
                <Checkbox
                        id={`${item.id}`}
                        onChange={this.updateRoles}
                        key={index}
                        style={listItem}>
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
        UserModel.modifyRoles(this.state.addToExistingRoles, this.props.selectedIds, this.state.selectedRoles)
            .then((response: IAxiosResponse): void => {
                this.hideModal();
            })
            .catch((error: IAxiosResponse): void => {
                this.setState({errorMessage: error.data.message});
            });
    }

    render(): JSX.Element {
        return (
            <Modal onHide={this.hideModal} show={this.props.visibility} backdrop="static">
                <Modal.Header>
                    Please select the roles:
                </Modal.Header>
                <Modal.Body>
                    <Row style={listStyle}>
                        <div style={listContainer}>
                            {this.renderRolesChecklist()}
                        </div>
                    </Row><hr/>
                    <Row style={listStyle}>
                        <Checkbox
                                id="addToExistingRoles" 
                                onChange={this.updateExistingRoleState}
                                checked={this.state.addToExistingRoles}>
                            Add to existing roles
                        </Checkbox>
                    </Row>
                    <Row>
                        <ErrorMessage message={this.state.errorMessage}/>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="submit" onClick={this.handleSubmit} bsStyle="primary">Submit</Button>
                    <Button id="cancel" onClick={this.hideModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

let mapStateToProps: MapStateToProps<IStateProps, IRolesModalProps> = (state: IStateProps): IRolesModalProps => {
    return {
        visibility: state.modalVisibility.toJS().rolesModal,
        recordsSelected: state.userAction.records,
        selectedIds: state.checkbox.selectedIds,
        selectAll: state.checkbox.selectAll,
    };
};

let RolesModal: React.ComponentClass<IRolesModalProps> = connect(mapStateToProps)(RolesModalImpl);
export {RolesModal};
