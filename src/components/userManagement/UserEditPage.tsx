import * as React from 'react';
import * as Radium from 'radium';
import {FormInput, IInstancePageProps} from 'react-hero';
import {FormGroup, Col, Button, Grid} from '../ReusableComponents';
import {UserModel} from '../../models/UserModel';
import {store} from '../../store';
import {Link} from 'react-router';
import {CSS} from '../../interfaces';

export interface IUserEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: UserModel) => void;
    instance: UserModel;
    isCreatePage: boolean;
    submitButtonStyle?: CSS;
    cancelButtonStyle?: CSS;
    gridStyle?: CSS;
    formContainerStyle?: CSS;
}

@Radium
export class UserEditPage extends React.Component<IUserEditPageProps, void> {
    static resourceName: string = 'userManagement';

    fetchStoreInstance = (): UserModel => {
        let instance: UserModel = this.props.instance;
        let instanceKey: string = `${instance.resourceName}Edit`;
        if (store.getState() && store.getState().forms) {
            instance.properties = store.getState().forms[`rhForms`][instanceKey].properties;
        }
        return instance;
    };

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        // Not using connect here to avoid rerendering of component on change of instance properties.
        this.props.handleSubmit(this.fetchStoreInstance());
    };

    render(): JSX.Element {
        return (
            <div style={this.props.formContainerStyle}>
                <form onSubmit={this.handleSubmit}>
                    <Grid style={this.props.gridStyle}>
                        <FormInput
                                type="text"
                                propertyName="First Name"
                                model="rhForms.userManagementEdit.properties.firstname"
                        />
                        <FormInput
                                type="text"
                                propertyName="Last Name"
                                model="rhForms.userManagementEdit.properties.lastname"
                        />
                        <FormInput
                                type="date"
                                propertyName="Date of birth"
                                model="rhForms.userManagementEdit.properties.birthdate"
                        />
                        <FormGroup>
                            <Col sm={4} smOffset={3}>
                                <Button 
                                        style={this.props.submitButtonStyle || defaultButtonStyles} 
                                        bsStyle="primary" 
                                        type="submit">
                                    Update
                                </Button>
                                <Link 
                                        style={this.props.cancelButtonStyle || defaultButtonStyles} 
                                        className="btn btn-default" 
                                        to={'/userManagement/list'}>
                                    Cancel
                                </Link>
                            </Col>
                        </FormGroup>
                    </Grid>
                </form>
            </div>
        );
    }
};

let defaultButtonStyles: CSS = {
    margin: '0px 10px'
};
