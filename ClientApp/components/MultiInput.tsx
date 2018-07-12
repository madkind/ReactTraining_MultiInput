import * as React from 'react';
import { ChangeEvent } from 'react';
import LocalizedStrings from 'react-localization';
import { RouteComponentProps } from 'react-router';
import * as shortid from 'shortid';
import * as Helper from '../helper'
import axios from 'axios'

let localizationStrings = new LocalizedStrings({
    en: {
        testCase: "test case",
        save: "Save",
        cancel: "Cancel"
    },
    hu: {
        testCase: "teszteset",
        save: "Mentés",
        cancel: "Mégse"
    }
});


enum InputType { Text, CheckBox, Date }

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
    backColorEven = { background: "#f2f6f7" }
    backColorOdd = { background: "#ffffff" }

    constructor(props: any) {
        super(props);
        this.state = { inputFields: [] };
        axios.get('api/MultiInput/GetMultiInputData')
            .then(response => {
                console.log(response)
                this.initState(response.data)
            })
        localizationStrings.setLanguage(Helper.language);
    }
    initState(values: any[]) {
        var inputFields: InputField[] = [];

        for (var i = 0; i < values.length; i++)
            inputFields.push({ value: values[i], key: shortid.generate(), type: this.getType(values[i]) })

        inputFields.push({ value: "", key: shortid.generate(), type: InputType.Text })

        this.setState({ inputFields: inputFields });
        this.originalState = Helper.deepCopy(this.state)
    }

    public render() {

        var margin = {
            margin: "6px",
            float: "right"
        }
       
        return <div>
            <h1>Multi input</h1>

            {this.state.inputFields.map(function (inputField, index) {
                return <div className="input-bar" key={inputField.key + "divmain"} style={margin} >
                    <div className="input-bar-item width100">
                        <label>{index + 1}. {localizationStrings.testCase}</label>
                        <div className="input-group">
                            {this.renderInputField(inputField, index)}
                            {this.renderCloseButton(inputField, index)}
                        </div>
                    </div>
                </div>
            }, this)}
            <div className="float-right" key={"divbutton"} style={margin}>
                <button type="button" className="btn btn-primary" style={margin} onClick={() => this.save()}>{localizationStrings.save}</button>
                <button type="button" className="btn btn-primary" style={margin} onClick={() => this.cancel()}>{localizationStrings.cancel}</button>
            </div>
        </div>;
    }

    public renderInputField(inputField: InputField, index: number) {
        switch (inputField.type) {
            case InputType.Text:
                return this.renderTextInputField(inputField,index)
            case InputType.CheckBox:
                return this.renderCheckboxInputField(inputField, index)
            default:
                throw new Error("Unsupported data type")
        }
    }

    public renderCheckboxInputField(inputField: InputField, index: number) {
        return <input type="checkbox"
            value="true"
            key={inputField.key + "checkbox"}
            style={index % 2 == 0 ? this.backColorEven : this.backColorOdd}
            onChange={(e) => this.edit(e, index)
            }
        />
    }

    public renderTextInputField(inputField: InputField, index: number) {
        var style = index % 2 == 0 ? this.backColorEven : this.backColorOdd
        return <input type="text"
            value={inputField.value}
            key={inputField.key + "input"}
            className="form-control"
            style={style}
            onChange={(e) => this.edit(e, index)
            }
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
        var newState = Helper.deepCopy(this.state)
        newState.inputFields[index].value = e.target.value

        if (index == this.state.inputFields.length - 1) {
            newState.inputFields.push({ value: "", key: shortid.generate(), type: InputType.Text });
        }
        this.setState(newState);
    }

    delete(index: number) {
        if (this.state.inputFields.length > 1) {
            var newState = Helper.deepCopy(this.state)
            var spliced = newState.inputFields.splice(index, 1);
            console.log(newState)
            this.setState(newState);
        }
    }

    save() {
        console.log(this.state.inputFields)
        axios.post('api/MultiInput/PostMultiInputData', this.state.inputFields)
    }

    cancel() {
        console.log(this.originalState)
        this.setState(this.originalState);
    }

    getType(value: any): InputType {
        if (typeof(value) == typeof(true)) {
            return InputType.CheckBox;
        }
        else if(typeof(value) == typeof("string")){
            return InputType.Text;
        }
        throw new Error("Unsupported data type")
    }
}

