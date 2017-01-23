import * as Axios from 'axios';
import {browserHistory} from 'react-router';
import {store} from '../store';
import {saveSignupFormData} from '../actions/signupAction';

/**
 * Type 'Object' is intentional for 'requestData' as sendRequest() 
 * is a generic function for sending request to the server.
 */
export const sendRequest = (requestUrl: string, successUrl: string, requestData: Object): void => {
    Axios.post(requestUrl, requestData)
    .then(function (response: Axios.AxiosXHR<any>) {
        browserHistory.push(successUrl);
    });
};

export const handleSignupInput = (key, value): void => {
    store.dispatch(saveSignupFormData(key, value));
};
