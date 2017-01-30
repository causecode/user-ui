import * as React from 'react';
import * as Radium from 'radium';
import {Modal} from './ReusableComponents';


@Radium
export class RolesModal extends React.Component<void, void> {

    getRolesChecklist = () => {
        const rolesList: string[] = ['USER'];
    }

    render(): JSX.Element {
        return (
            <div>
                
            </div>
        );
    }
}
