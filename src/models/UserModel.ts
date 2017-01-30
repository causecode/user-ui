import {BaseModel, ModelPropTypes} from 'react-hero';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateCreated: Date;
    lastUpdated: Date;
}

export class UserModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER,
        firstName: ModelPropTypes.STRING,
        lastName: ModelPropTypes.STRING,
        email: ModelPropTypes.STRING,
        dateCreated: ModelPropTypes.DATE,
        lastUpdated: ModelPropTypes.DATE,
        birthdate: ModelPropTypes.DATE
    };

    static defaultProps = {
        firstName: '',
        lastName: '',
        email: '',
        dateCreated: '',
        birthdate: ''
    };

    static resourceName: string = 'userManagement';

    static columnNames: string[] = [
        'firstName',
        'lastName',
        'email',
        'dateCreated',
        'lastUpdated'
    ];

    constructor(properties: IUser) {
        super(properties);
    }
}
