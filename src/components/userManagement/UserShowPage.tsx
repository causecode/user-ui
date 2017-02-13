import * as React from 'react';
import * as moment from 'moment';
import * as Radium from 'radium';
import {IInstancePageProps} from 'react-hero';
import {defaultTableStyle} from '../../constants/palette';
import {Table} from '../ReusableComponents';
import {CSS} from '../../interfaces';

export interface IUserShowPageProps extends IInstancePageProps {
    tableStyles?: CSS;
}

@Radium
export class UserShowPage extends React.Component<IUserShowPageProps, void> {
    static resourceName: string = 'userManagement';
    
    render(): JSX.Element {
        const {instance} =  this.props;
        return (
            <Table style={defaultTableStyle} striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
               <tbody>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{instance.properties.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Username</strong></td>
                        <td>{instance.properties.username}</td>
                    </tr>
                    <tr>
                        <td><strong>First Name</strong></td>
                        <td>{instance.properties.firstname}</td>
                    </tr>
                    <tr>
                        <td><strong>Last Name</strong></td>
                        <td>{instance.properties.lastname}</td>
                    </tr>
                    <tr>
                        <td><strong>Gender</strong></td>
                        <td>{instance.properties.gender}</td>
                    </tr>
                    <tr>
                        <td><strong>Date of Birth</strong></td>
                        <td>{moment(instance.properties.birthdate).format('MM-DD-YYYY')}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}
