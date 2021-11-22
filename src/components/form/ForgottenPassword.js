import React, { Component } from 'react';
import Input from './Input';
import { render } from '@testing-library/react';
import strings from '../../localization/Localization.js';
import Button from '@mui/material/Button';
import MyTheme from '../common/MyTheme.js';
import dataProvider from '../../helpers/dataProvider.js';
import config from '../../config.json';

export default class ForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValidForm: false,
            isValidEmail: false,
            isValidPassword: false,
            validInfo: strings.invalidName + " " + strings.invalidPassword,
            result: null,
            show: true
        };
        const handleChangePassword = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPassword: isValid });
        const handleChangeEmail = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidEmail: isValid });
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
        this.handleChangeEmail = handleChangeEmail.bind(this, 'email');
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async validate() {
        let info = "";
        if (this.state.isValidName && this.state.isValidSurname && this.state.isValidEmail && this.state.isValidPassword && this.state.isValidCaptcha) {

            let newUserName = this.state.surname.substring(0, 5).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + this.state.name.substring(0, 3).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            var response = await dataProvider.checkUser(newUserName, this.state.email)

            if (response[0] === 200) {
                newUserName = response[2]
                response = await dataProvider.postDataUnauth('identity/ForgetPassword', {
                    registrationCallbackUrl: config.WEB_URL + '/#/confirm/:confirm=password_{0}_{1}',
                    email: this.state.email
                })
            } else {
                this.setState({ show: true });
                return ([response[1], true]);
            }
        } else {
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

    handleReset() {
        this.setState({ password: "", email: "" });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const result = await this.validate();
        this.setState({ result: result[0] });
        this.props.onResultChange(result[0], result[1], result[2]);
        if (this.state.isValidForm)
            this.handleReset();
        render()
    }

    toLogin() {
        this.props.onResultChange('', !this.state.show, this.state.show, !this.state.show, '');
        render();
    }

    toRegistration() {
        this.props.onResultChange('', this.state.show, !this.state.show, !this.state.show, '');
    }

    render() {
        return (
            <form className="" id="forgPassForm">
                <div className="h3">{strings.forgottenPassword}</div>
                <Input name="email"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    label={strings.email}
                    type="text"
                    required={true} />
                <Input name="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    label={strings.newPassword}
                    type="password"
                    required={true} />
                <Button type="submit" onClick={this.handleSubmit} variant="contained" className="width300" theme={MyTheme}> {strings.resetPassword} </Button>
                <div className="divLink" onClick={() => this.toLogin()} variant="contained"> {strings.backToLogin} </div>
                <div className="divLink" onClick={() => this.toRegistration()} variant="contained"> {strings.newRegistration} </div>
            </form>
        );
    }
}