import * as React from 'react';
import * as Radium from 'radium';
import {getDefaultHeaders, showConfirmationModal} from '../../utils';
import {connect, MapStateToProps} from 'react-redux';
import {ConfirmationModal} from '../modals/ConfirmationModal';
import {CSS, IStateProps} from '../../interfaces';
import {ModelService} from 'react-hero';
import {RolesModal} from '../modals/RolesModal';
import {Row, Col} from '../ReusableComponents';
import {pullRight} from '../../constants/palette';
import {
    DataGrid,
    IFromJS,
    UserActions,
    IBulkUserActionType,
    IUserActionStateProps,
    BaseModel,
    PagedListFilters,
    DropDownFilter
} from 'react-hero';

export interface IUserListDispatchProps {
    setPage?: (pageNumber: number, resource: string) => void;
}

export interface IUserListStateProps extends IUserActionStateProps {
    properties?: string[];
    instanceList?: BaseModel[];
    totalCount?: number;
    selectedIds?: number[];
}

export interface IUserListProps extends IUserListStateProps, IUserListDispatchProps {
    resource: string;
}

@Radium
export class UserListPageImpl extends React.Component<IUserListProps, void> {

    static resourceName: string = 'userManagement';
    private max: number = 10;

    private userActions: IBulkUserActionType[]  = [
        {label: 'Export Report', action: showConfirmationModal},
        {label: 'Lock account(s)', action: showConfirmationModal},
        {label: 'Unlock account(s)', action: showConfirmationModal},
        {label: 'Change role', action: showConfirmationModal}
    ];

    componentWillMount = (): void => {
        const {resource} = this.props;
        this.fetchInstanceList(resource, {action: 'list'});
    };

    fetchInstanceList(resource: string, filters: any = {}): void {
        if (this.max > 0) {
            filters.max = this.max;
        }
        ModelService.getModel(resource).list(filters, false, getDefaultHeaders());
    }

    render(): JSX.Element {
              
        return (
            <div style={listContainer}>
                <h2>User Management</h2>
                <Row>
                    <Col md={4}>
                        <span style={pullRight}>
                            <UserActions
                                    totalCount={this.props.totalCount} 
                                    isDisabled={false} 
                                    userActionsMap={this.userActions} />
                        </span>
                    </Col>
                </Row>
                <PagedListFilters resource={UserListPageImpl.resourceName}>
                    <DropDownFilter
                            label="Sort"
                            paramName="sort"
                            possibleValues={[
                                {label: 'Id', value: 'id'},
                                {label: 'First Name', value: 'firstName'},
                                {label: 'Last Name', value: 'lastName'},
                                {label: 'Email', value: 'email'},
                                {label: 'Date Created', value: 'dateCreated'},
                                {label: 'Last Updated', value: 'lastUpdated'}
                            ]}
                    />
                    <DropDownFilter
                            label="Order"
                            paramName="order"
                            possibleValues={[
                                {label: 'Ascending', value: 'asc'},
                                {label: 'Descending', value: 'desc'}
                            ]}
                    />
                </PagedListFilters>
                <DataGrid
                        instanceList={this.props.instanceList}
                        properties={this.props.properties}
                        totalCount={this.props.totalCount}
                />
                <ConfirmationModal/>
                <RolesModal/>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IStateProps, IUserListProps> = 
        (state: IStateProps, ownProps: IUserListProps): IUserListStateProps => {
    let resourceData: IUserListStateProps & IFromJS = state.data.get(`${ownProps.resource}List`, {});
    resourceData = resourceData.toJS ? resourceData.toJS() : resourceData;
    return {
        properties: resourceData.properties,
        instanceList: resourceData.instanceList,
        totalCount:  resourceData.totalCount,
    };
};

let UserListPage: React.ComponentClass<IUserListProps> = connect(mapStateToProps)(UserListPageImpl);
export {UserListPage};

const listContainer: CSS = {
    padding: '20px'
};
