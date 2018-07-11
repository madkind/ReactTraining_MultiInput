import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';

interface MultiInputState {
    values: any[];
}

export class MultiInput extends React.Component<RouteComponentProps<{}>, MultiInputState> {
   
    constructor() {
        super();
        this.state = {
            values: ["Cream-colored ponies", "crisp apple strudels", "Doorbells", "sleigh bells", "schnitzel with noodles"]
        };
    }
    public render() {
        return <div>
            <h1>Multi input</h1>

            <p>This is a simple example of a React component.</p>
            <ul>
                {this.state.values.map(function (value, index) {
                    return <input type="text"
                        key={index}
                        className="form-control"
                        placeholder={index.toString()}
                        defaultValue={value}
                        onChange={()=>this.edit(index)} />
                },this)}
            </ul>
        </div>;


    }
    edit(index: number) {

        if (index == this.state.values.length - 1) {
            var newState = this.state
            newState.values.push("")
            this.setState(newState);
        }
    }
}

