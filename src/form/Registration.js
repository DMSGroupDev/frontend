import React, { Component } from 'react';
import Input from './Input';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { render } from '@testing-library/react';
import strings from '../localization/Localization.js';

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName: "", 
            name: "",
            surname: "",
            email: "", 
            password: "",
            isValidForm: false,
            isValidUserName: false,
            isValidEmail: false,
            isValidPassword: false,
            validInfo: "",
            result: null,
            show: true};

        const handleChangeUserName = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidUserName: isValid});
        const handleChangeEmail = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidEmail: isValid});
        const handleChangePassword = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPassword: isValid});
        const handleChangeName = (name, value, validInfo) => this.setState({ [name]: value, validInfo: validInfo});
        const handleChangeSurname = (name, value, validInfo) => this.setState({ [name]: value, validInfo: validInfo});
        this.handleChangeUserName = handleChangeUserName.bind(this, 'userName');
        this.handleChangeEmail = handleChangeEmail.bind(this, 'email');
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
        this.handleChangeName = handleChangeName.bind(this, 'name');
        this.handleChangeSurname = handleChangeSurname.bind(this, 'surname');
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {
        let info = "";
        if (this.state.isValidUserName && this.state.isValidEmail && this.state.isValidPassword)
        {
            // TODO SEND DATA TO DB
            info = this.state.userName + strings.resultSuccess;
            this.setState({ show: false });
            return ([info, false]);
        } else {
            if(!this.state.isValidUserName) {
                info = strings.invalidUserName;
            }
            if (!this.state.isValidEmail) {
                if (info !== "")
                    info += ", ";
                info += strings.invalidEmail
            }
            if (!this.state.isValidPassword) {
                if (info !== "")
                    info += ", ";
                info += strings.invalidPassword
            }
            this.setState({ show: true });
            return ([info, true]);
        }
    }

    handleReset(){
        this.setState({ userName: "", email: "", password: "", name: "", surname: ""});
      };

    handleSubmit(event) {
        event.preventDefault();
        var result = this.validate(); 
        this.setState({ result: result[0] });
        this.props.onResultChange(result[0], result[1]);
        this.handleReset();
        render()
    }

    render() {
        return (
            <form className="" autoComplete="off" id="registrationForm">
                <div className="h2">{strings.titleRegistration}</div>
                <Input name="userName" 
                    value={this.state.userName}
                    onChange={this.handleChangeUserName}
                    label={strings.userName}
                    type="text"
                    required = "true"/>
                <Input name="email" 
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    label={strings.email}
                    type="email"
                    required = "true"/>
                <Input name="password" 
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    label={strings.password}
                    type="password"
                    required = "true"/>
                <Input name="name" 
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    label={strings.name}
                    type="text"
                    required = "false"/>
                <Input name="surname" 
                    value={this.state.surname}
                    onChange={this.handleChangeSurname}
                    label={strings.surname}
                    type="text"
                    required = "false"/>
                <input type="submit" className="btn btn-sm btn-light" value={strings.register} onClick={this.handleSubmit} />
            </form>
        );
    }
}