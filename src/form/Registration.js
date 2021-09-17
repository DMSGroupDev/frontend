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
            captcha: "",
            isValidForm: false,
            isValidEmail: false,
            isValidPassword: false,
            isValidName: false,
            isValidSurname: false,
            isValidCaptcha: false,
            validInfo: strings.invalidName + " " + strings.invalidSurname +  " " + strings.invalidEmail + " " + strings.invalidPassword + " " + strings.invalidCaptcha,
            result: null,
            show: true};

        const handleChangeEmail = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidEmail: isValid});
        const handleChangePassword = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPassword: isValid});
        const handleChangeName = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidName: isValid});
        const handleChangeSurname = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidSurname: isValid});
        const handleChangeCaptcha = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidCaptcha: isValid});
        this.handleChangeEmail = handleChangeEmail.bind(this, 'email');
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
        this.handleChangeName = handleChangeName.bind(this, 'name');
        this.handleChangeSurname = handleChangeSurname.bind(this, 'surname');
        this.handleChangeCaptcha = handleChangeCaptcha.bind(this, 'captcha');
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {
        let info = "";
        if (this.state.isValidName && this.state.isValidSurname && this.state.isValidEmail && this.state.isValidPassword && this.state.isValidCaptcha)
        {

            // TODO check unique email and newUserName
            let newUserName = this.state.surname.substring(0,5).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + this.state.name.substring(0,3).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            info = this.state.name + ' ' + this.state.surname + strings.resultSuccess + newUserName;
            this.setState({ show: false, isValidForm: true });

            // TODO SEND DATA TO DB
            return ([info, false]);
        } else {
            if(!this.state.isValidName) {
                info = strings.invalidName;
            }
            if(!this.state.isValidSurname) {
                if (info !== "")
                    info += ", ";
                info += strings.invalidSurname;
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
            if (!this.state.isValidCaptcha) {
                if (info !== "")
                    info += ", ";
                info += strings.invalidCaptcha
            }
            this.setState({ show: true });
            return ([info, true]);
        }
    }

    handleReset(){
        this.setState({email: "", password: "", name: "", surname: ""});
      };

    handleSubmit(event) {
        event.preventDefault();
        var result = this.validate(); 
        this.setState({ result: result[0] });
        this.props.onResultChange(result[0], result[1]);
        if (this.state.isValidForm)
            this.handleReset();
        render()
    }

    render() {
        return (
            <form className="" autoComplete="off" id="registrationForm">
                <div className="h2">{strings.titleRegistration}</div>
                <Input name="name" 
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    label={strings.name}
                    type="text"
                    required={true}/>
                <Input name="surname" 
                    value={this.state.surname}
                    onChange={this.handleChangeSurname}
                    label={strings.surname}
                    type="text"
                    required={true}/>
                <Input name="email" 
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    label={strings.email}
                    type="email"
                    required={true}/>
                <Input name="password" 
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    label={strings.password}
                    type="password"
                    required={true}/>
                <Input name="captcha" 
                    value=""
                    onChange={this.handleChangeCaptcha}
                    label=""
                    type="captcha"/>
                <input type="submit" className="btn btn-sm btn-light" value={strings.register} onClick={this.handleSubmit} />
            </form>
        );
    }
}