import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Row, Col} from './ReusableComponents';
import {CSS} from '../interfaces';
import {checkIfQueryParamExist, getParameterByName, toggleConfirmationModal} from '../utils';
import {ModelService} from 'react-hero';
import {ConfirmationModal} from './ConfirmationModal';
import {
    DataGrid, 
    clearUserAction, 
    config, 
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

export class UserListPageImpl extends React.Component<IUserListProps, void> {

    static resourceName: string = 'userManagement';
    private max: number = 10;

    private userActions: IBulkUserActionType[]  = [
        {label: 'Export Report', action: toggleConfirmationModal},
        {label: 'Lock account(s)', action: toggleConfirmationModal},
        {label: 'Unlock account(s)', action: toggleConfirmationModal},
        {label: 'Change role', action: toggleConfirmationModal}
    ];

    componentWillMount = (): void => {
        const {resource} = this.props;
        this.fetchInstanceList(resource, {action: 'list'});
    };

    componentWillUnmount = (): void => {
        // resetSelectedRecords();
    }

    fetchInstanceList(resource: string, filters: any = {}): void {
        if (this.max > 0) {
            filters.max = this.max;
        }
        ModelService.getModel(resource).list(filters);
    }

    render(): JSX.Element {
              
        return (
            <div style={listContainer}>
                <h2>User Management</h2>
                <Row>
                    <Col md={8}>
                            SEARCH COMPONENT
                    </Col>
                    <Col md={4}>
                        <span style={{float: 'right'}}>
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
                            possibleValues={['id', 'firstName', 'lastName', 'email', 'dateCreated', 'lastUpdated']}
                    />
                    <DropDownFilter
                            label="Order"
                            paramName="order"
                            possibleValues={['ascending', 'descending']}
                    />
                </PagedListFilters>
                <DataGrid
                        instanceList={this.props.instanceList}
                        properties={this.props.properties}
                        totalCount={this.props.totalCount}
                />
                <ConfirmationModal/>
            </div>
        );
    }
}

let mapStateToProps = (state, ownProps): IUserListStateProps => {
    let resourceData: IUserListStateProps & IFromJS = state.data.get(`${ownProps.resource}List`, {});
    resourceData = resourceData.toJS ? resourceData.toJS() : resourceData;
    return {
        properties: resourceData.properties,
        instanceList: resourceData.instanceList,
        totalCount:  resourceData.totalCount,
        selectedIds: state.checkbox.selectedIds,
        selectAllOnPage: state.checkbox.selectAllOnPage,
        selectAll: state.checkbox.selectAll,
    };
};

// let mapDispatchToProps = (dispatch): IUserListDispatchProps => {
//     return {
//         setPage: (pageNumber, resource) => {
//             dispatch(setPage(pageNumber, resource));
//         }
//     };
// };

let UserListPage = connect(mapStateToProps)(UserListPageImpl);
export {UserListPage};

const listContainer: CSS = {
    padding: '20px'
};
