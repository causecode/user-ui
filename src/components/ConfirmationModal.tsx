import * as React from 'react';
import * as Radium from 'radium';
import {Modal, Col, Row, Button} from './ReusableComponents';
import {connect, MapStateToProps} from 'react-redux';
import {CSS, IState} from '../interfaces';
import {toggleConfirmationModal, toggleRolesListModal} from '../utils';
import {UserModel} from '../models/UserModel';
import FontAwesome = require('react-fontawesome');

export interface IConfirmationModalProps {
    visibility?: boolean;
    actionName?: string;
    recordsSelected?: number;
    selectedIds?: number[];
    selectAll?: boolean;
}

@Radium
export class ConfirmationModalImpl extends React.Component<IConfirmationModalProps, void> {

    handleAction = (event: React.FormEvent): void => {
        let selectedIds: string = this.props.selectedIds.join(',') || '';
        switch (this.props.actionName) {
            case 'Export Report':
                UserModel.exportUserReport(this.props.selectAll, selectedIds);
                break;

            case 'Lock account(s)':
                UserModel.lockUnlockUserAccounts(true, selectedIds);
                break;

            case 'Unlock account(s)':
                UserModel.lockUnlockUserAccounts(false, selectedIds);
                break;

            case 'Change role':
                this.hideModal();
                toggleRolesListModal(true);
                break;

            default:
                this.hideModal();
        }
    }

    hideModal = (): void => {
        toggleConfirmationModal(false);
    }

    render(): JSX.Element {
        return (
                <Modal onHide={this.hideModal} show={this.props.visibility} backdrop="static">
                    <Modal.Body>
                        <Row>
                            <Col sm={3} style={modalIcon}>
                                <FontAwesome name="question-circle" size="3x"/>
                            </Col>
                            <Col sm={9}>
                                <strong>
                                    Are you sure you want to perform this action:<br/>
                                    {this.props.actionName} on {this.props.recordsSelected} records ?
                                </strong>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAction} bsStyle="primary">OK</Button>
                        <Button onClick={this.hideModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}

let mapStateToProps: MapStateToProps<IState, IConfirmationModalProps> = (state: IState): IConfirmationModalProps => {
    return {
        visibility: state.modalVisibility.toJS().confirmationModal,
        actionName: state.userAction.action,
        recordsSelected: state.userAction.records,
        selectedIds: state.checkbox.selectedIds,
        selectAll: state.checkbox.selectAll,
    };
};

let ConfirmationModal: React.ComponentClass<IConfirmationModalProps> = connect(mapStateToProps)(ConfirmationModalImpl);
export {ConfirmationModal};

const modalIcon: CSS = {
    textAlign: 'center'
};
