import React, { Component } from 'react';
import Input from './Input';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import LocalizedStrings from 'react-localization';
import { render } from '@testing-library/react';

let strings = new LocalizedStrings({
    en:{
        userName: "User name",
        email: "Email",
        register: "Register",
        password: "Password",
        resultSuccess: " is new registered user",
        invalidEmail: "email format is invalid",
        invalidPassword: "password is too short",
        invalidUserName: "username is not valid",
        title: "User registration"

    },
    cz: {
        userName: "Jméno",
        email: "Email",
        register: "Registrovat",
        password: "Heslo",
        resultSuccess: " je nově registrovaný uživatel",
        invalidEmail: "formát emailu není validní",
        invalidPassword: "heslo je příliš krátké",
        invalidUserName: "uživatelské jméno není validní",
        title: "Registrace uživatele"
    }
   });

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName: "", 
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
        this.handleChangeUserName = handleChangeUserName.bind(this, 'userName');
        this.handleChangeEmail = handleChangeEmail.bind(this, 'email');
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
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
        this.setState({ userName: "", email: "", password: ""});
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
                <div className="h2">{strings.title}</div>
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
                <input type="submit" className="btn btn-sm btn-light" value={strings.register} onClick={this.handleSubmit} />
            </form>
        );
    }
}