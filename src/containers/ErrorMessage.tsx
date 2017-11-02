import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../interfaces';

export interface IErrorMessageProps {
    message?: string;
}

@Radium
export class ErrorMessage extends React.Component<IErrorMessageProps, {}> {

    render(): JSX.Element {
        return (
            <div style={errorMessage}>
                {this.props.message || ''}
            </div>
        );
    }
}

export const errorMessage: CSS = {
    marginBotton: '10px',
    textAlign: 'center',
    color: '#FB540C',
};
