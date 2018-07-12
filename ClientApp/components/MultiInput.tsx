import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as shortid from 'shortid'
import { ChangeEvent } from 'react';


enum InputType { Text }

interface InputField {
    key: string,
    value: any,
    type: InputType
}

interface MultiInputState {
    inputFields: InputField[];
}

export class MultiInput extends React.Component<RouteComponentProps<{}>, MultiInputState> {

    originalState: any;

    constructor() {
        super();
        var inputFields: InputField[] = [];
        var values: any[] = ["Cream-colored ponies", "crisp apple strudels", "Doorbells", "sleigh bells", "schnitzel with noodles"]

        for (var i = 0; i < values.length; i++) {
            inputFields.push({ value: values[i], key: shortid.generate(), type: InputType.Text })
        }

        this.state = {
            inputFields: inputFields
        };

        this.originalState = JSON.parse(JSON.stringify(this.state));
    }

    public render() {

        var margin = {
            margin: "6px",
            //border: "5px solid red",
            float: "right"
        }

        return <div>
            <h1>Multi input</h1>

            <p>This is a simple example of a React component.</p>

            {this.state.inputFields.map(function (inputField, index) {
                return <div className="input-bar" key={inputField.key + "divmain"} style={margin}>
                    <div className="input-bar-item width100">
                        <label>{index + 1}. test case</label>
                        <div className="input-group">
                            {this.renderInputField(inputField, index)}
                            {this.renderCloseButton(inputField, index)}
                        </div>
                    </div>
                </div>
            }, this)}
            <div className="float-right" key={"divbutton"} style={margin}>
                <button type="button" className="btn btn-primary" style={margin} onClick={() => this.save()}>Save</button>
                <button type="button" className="btn btn-primary" style={margin} onClick={() => this.cancel()}>Cancel</button>
            </div>
        </div>;
    }

    public renderInputField(inputField: InputField, index: number) {
        return <input type="text"
            value={inputField.value}
            key={inputField.key + "input"}
            className="form-control"
            onChange={(e) => this.edit(e, index)}
        />
    }
    public renderCloseButton(inputField: InputField, index: number) {
        return <span className="input-group-btn">
            <button className="btn"
                onClick={() => this.delete(index)}
                key={inputField.key + "button"}
                disabled={this.state.inputFields.length == 1}>
                &times;
                                    </button>
        </span>
    }


    edit(e: ChangeEvent<HTMLInputElement>, index: number) {
        var newState = JSON.parse(JSON.stringify(this.state));
        console.log(this.state)
        console.log(e.target.value)
        newState.inputFields[index].value = e.target.value
        console.log(newState)

        if (index == this.state.inputFields.length - 1) {
            newState.inputFields.push({ value: "", key: shortid.generate(), type: InputType.Text });
        }
        this.setState(newState);
    }

    delete(index: number) {
        if (this.state.inputFields.length > 1) {
            var newState = JSON.parse(JSON.stringify(this.state));
            var spliced = newState.inputFields.splice(index, 1);
            console.log(newState)
            this.setState(newState);
        }
    }

    save() {
        console.log(this.state.inputFields)
    }

    cancel() {
        console.log(this.originalState)
        this.setState(this.originalState);
    }
}

