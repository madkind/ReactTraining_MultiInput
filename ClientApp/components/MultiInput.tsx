import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as shortid from 'shortid'


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

    console.log('CTOR')
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
            return <div className="input-bar" key={inputField.key + "div"} style={margin}>
                <div className="input-bar-item width100">

                    <div className="input-group">
                        <input type="text"
                            key={inputField.key + "input"}
                            className="form-control"
                            placeholder={index.toString()}
                            defaultValue={inputField.value}
                            onChange={() => this.edit(index)}
                        />
                        <span className="input-group-btn">
                            <button className="btn"
                                onClick={() => this.delete(index)}
                                key={inputField.key + "button"}>
                                &times;
                                    </button>
                        </span>
                    </div>

                </div>
            </div>
        }, this)}
        <div className="float-right" style={margin}>
            <button type="button" className="btn btn-primary" style={margin} onClick={() => this.save()}>Save</button>
            <button type="button" className="btn btn-primary" style={margin} onClick={() => this.cancel()}>Cancel</button>
        </div>
    </div>;
}

edit(index: number) {
    if (index == this.state.inputFields.length - 1) {
        var newState = JSON.parse(JSON.stringify(this.state));
        newState.inputFields.push({ value: "", key: shortid.generate(), type: InputType.Text });
        this.setState(newState);
    }
}

delete (index: number) {
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

