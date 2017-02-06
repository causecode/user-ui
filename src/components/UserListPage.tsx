import * as React from 'react';
import * as Radium from 'radium';
import {connect} from 'react-redux';
import {Row, Col, Pagination} from './ReusableComponents';
import {CSS} from '../interfaces';
import {ModelService} from 'react-hero';
import {ConfirmationModal} from './ConfirmationModal';
import {getDefaultHeaders, checkIfQueryParamExist, getParameterByName, showConfirmationModal} from '../utils';
import {RolesModal} from './RolesModal';
import {
    DataGrid,
    IFromJS,
    UserActions,
    IBulkUserActionType,
    IUserActionStateProps,
    BaseModel,
    PagedListFilters,
    DropDownFilter,
    resetCheckboxState
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

    componentWillUnmount = (): void => {
        // resetSelectedRecords();
    }

    fetchInstanceList(resource: string, filters: any = {}): void {
        if (this.max > 0) {
            filters.max = this.max;
        }
        ModelService.getModel(resource).list(filters, false, getDefaultHeaders());
    }

    handlePagination: any = (pageNumber: number): void => {
        const {resource} = this.props;
        if (checkIfQueryParamExist()) {
            let listID: string = getParameterByName('listID');
            let listName: string = getParameterByName('listName');
            this.fetchInstanceList(resource, {action: 'list', listID: listID, 
                    listName: listName, offset: (pageNumber - 1) * this.max});
        } else {
            this.fetchInstanceList(this.props.resource, {action: 'list', offset: (pageNumber - 1) * this.max});
        }
        this.props.setPage(pageNumber, this.props.resource);
        resetCheckboxState();
    };

    render(): JSX.Element {
              
        return (
            <div style={listContainer}>
                <h2>User Management</h2>
                <Row>
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
                <RolesModal/>
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
    };
};

let UserListPage = connect(mapStateToProps)(UserListPageImpl);
export {UserListPage};

const listContainer: CSS = {
    padding: '20px'
};
