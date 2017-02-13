import {UserModel, IUser} from '../../src/models/UserModel';

export const instance: IUser = {
    id: 1,
    firstName: 'testName',
    lastName: 'testName',
    email: 'test@email.com',
    dateCreated: new Date(),
    lastUpdated: new Date('2017-02-03T00:00:00'),
    birthdate: new Date('1992-11-13T00:00:00')
};

export const userModelInstance: UserModel = new UserModel(instance);