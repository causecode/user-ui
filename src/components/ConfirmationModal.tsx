import * as React from 'react';
import * as Radium from 'radium';
import * as Axios from 'axios';
import {Modal, Col, Row, Button} from './ReusableComponents';
import {toggleConfirmationModal} from '../utils';
import {connect, MapStateToProps} from 'react-redux';
import {CSS} from '../interfaces';
import FontAwesome = require('react-fontawesome');

export interface IConfirmationModalProps {
    visibility?: boolean;
    actionName?: string;
    recordsSelected?: number;
}

@Radium
export class ConfirmationModalImpl extends React.Component<IConfirmationModalProps, void> {

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let url: string = 'http://localhost:8080/api/v1/userManagement/action/export?selectAll=false&selectedIds=426%2C424';
        Axios.get(url);
    }

    render(): JSX.Element {
        return (
                <Modal onHide={toggleConfirmationModal} show={this.props.visibility} backdrop="static">
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
                        <form onSubmit={this.handleSubmit}>
                            <Button type="submit" bsStyle="primary">OK</Button>
                        </form>
                        <Button onClick={toggleConfirmationModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}

let mapStateToProps = (state): IConfirmationModalProps => {
    return {
        visibility: state.showConfirmationModal,
        actionName: state.userAction.action,
        recordsSelected: state.userAction.records
    };
};

let ConfirmationModal: React.ComponentClass<IConfirmationModalProps> = connect(mapStateToProps)(ConfirmationModalImpl);
export {ConfirmationModal};

const modalIcon: CSS = {
    textAlign: 'center'
};
