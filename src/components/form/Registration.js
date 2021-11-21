import React, { Component } from 'react';
import Input from './Input';
import { render } from '@testing-library/react';
import strings from '../../localization/Localization.js';
import Button from '@mui/material/Button';
import MyTheme from '../common/MyTheme.js';
import dataProvider from '../../helpers/dataProvider.js';
import config from '../../config.json';

export default class Registration extends Component {
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
            validInfo: strings.invalidName + " " + strings.invalidSurname + " " + strings.invalidEmail + " " + strings.invalidPassword + " " + strings.invalidCaptcha,
            result: null,
            show: true
        };

        const handleChangeEmail = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidEmail: isValid });
        const handleChangePassword = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPassword: isValid });
        const handleChangeName = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidName: isValid });
        const handleChangeSurname = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidSurname: isValid });
        const handleChangeCaptcha = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidCaptcha: isValid });
        this.handleChangeEmail = handleChangeEmail.bind(this, 'email');
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
        this.handleChangeName = handleChangeName.bind(this, 'name');
        this.handleChangeSurname = handleChangeSurname.bind(this, 'surname');
        this.handleChangeCaptcha = handleChangeCaptcha.bind(this, 'captcha');
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async validate() {
        let info = "";
        if (this.state.isValidName && this.state.isValidSurname && this.state.isValidEmail && this.state.isValidPassword && this.state.isValidCaptcha) {

            let newUserName = this.state.surname.substring(0, 5).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + this.state.name.substring(0, 3).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            var response = await dataProvider.checkUser(newUserName, this.state.email)

            if (response[0] === 200){
                newUserName = response[2]
                response = await dataProvider.postDataUnauth('authenticate/Register', {
                    registrationCallbackUrl: config.WEB_URL + '/#/confirm/:confirm=registration_{0}_{1}',
                    userName: newUserName,
                    firstName: this.state.name,
                    lastName: this.state.surname,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.password})

                if (response[0] === 200) {
                    this.setState({ show: false });
                    return ([strings.registrationSuccessEmail, false]);
                } else {
                    this.setState({ show: true });
                    return ([response[1], true]);
                }
            } else {
                this.setState({ show: true });
                return ([response[1], true]);
            }
        } else {
            if (!this.state.isValidName) {
                info = strings.invalidName;
            }
            if (!this.state.isValidSurname) {
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

    handleReset() {
        this.setState({ email: "", password: "", name: "", surname: "", captcha: "" });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const result = await this.validate();
        this.setState({ result: result[0] });
        this.props.onResultChange(result[0], result[1], !result[1], '');
        if (this.state.isValidForm)
            this.handleReset();
        render()
    }

    toLogin() {
        this.props.onResultChange('', !this.state.show, this.state.show, !this.state.show, '');
        render();
    }

    toForgottenPass() {
        this.props.onResultChange('', !this.state.show, !this.state.show, this.state.show, '');
    }

    render() {
        return (
            <form className="" autoComplete="off" id="registrationForm">
                <div className="h3">{strings.titleRegistration}</div>
                <Input name="name"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    label={strings.name}
                    type="text"
                    required={true} />
                <Input name="surname"
                    value={this.state.surname}
                    onChange={this.handleChangeSurname}
                    label={strings.surname}
                    type="text"
                    required={true} />
                <Input name="email"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    label={strings.email}
                    type="email"
                    required={true} />
                <Input name="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    label={strings.password}
                    type="password"
                    required={true} />
                <Input name="captcha"
                    value=""
                    onChange={this.handleChangeCaptcha}
                    label="Captcha"
                    type="captcha"
                    required={true} />
                <Button type="submit" onClick={this.handleSubmit} variant="contained" className="width300" theme={MyTheme}> {strings.register} </Button>
                <div className="divLink" onClick={() => this.toForgottenPass()} variant="contained"> {strings.forgottenPassword} </div>
                <div className="divLink" onClick={() => this.toLogin()} variant="contained"> {strings.backToLogin} </div>
            </form>
        );
    }
}