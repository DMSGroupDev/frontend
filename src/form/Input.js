import React, { Component } from 'react';
import validator from 'validator';
import strings from '../localization/Localization.js';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: this.props.value,
            isValid: false,
            validInfo: "",
            required: false,
            reqStar: ""
        };
        if (this.props.required === 'true'){
            this.state.required = true;
            this.state.reqStar = "*"
            } else {
                this.state.isValid = true;
            }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;                
        this.setState({ value: value});
        this.validateField(name, value, this.state.required);
    }

      validateField(fieldName, value, required) {
        let isValid = this.state.isValid;
        let validInfo = this.state.validInfo;
      
        switch(fieldName) {
          case 'email':
            isValid = validator.isEmail(value);
            validInfo = isValid ? '' : strings.invalidEmail;
            this.setState({
                isValid: isValid,
                validInfo: validInfo,
                reqStar: "*"
            })
            
            break;
          case 'password':
            isValid = value.length >= 6;
            validInfo = isValid ? '': strings.invalidPassword;
            this.setState({
                isValid: isValid,
                validInfo: validInfo,
                reqStar: "*"
            })
            break;
          default:
            if(!required){
                isValid = true;
                validInfo = '';
                this.setState({
                    isValid: isValid,
                    validInfo: validInfo,
                })
            } else {
                isValid = value.length >= 2;
                validInfo = isValid ? '': strings.invalidTextValue;
                this.setState({
                    isValid: isValid,
                    validInfo: validInfo,
                    reqStar: "*"
                 })
            }
            break;
        }
        this.props.onChange(value, validInfo, isValid);
      }

    render() {
        const { name, label, type} = this.props;
        
        return (
            <div className="row inputGroup">
                <label htmlFor={name} className="inputLabel">
                    {label} <span className="text-danger">{this.state.reqStar}</span>
                </label>
                <div>
                <input id={name} name={name}
                        value={this.state.value} 
                        onChange={this.handleChange}
                        type={type}
                        required={this.state.required}
                        className="form-control input"
                        />
                <span className="text-danger">{this.state.validInfo} </span>
                </div>
            </div>
        );
    }
}