import React, { Component } from 'react';
import Input from './Input';
import { render } from '@testing-library/react';
import strings from '../../localization/Localization.js';
import Button from '@mui/material/Button';
import MyTheme from '../common/MyTheme.js';
import dataProvider from '../../helpers/dataProvider.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValidForm: false,
            isValidEmail: false,
            isValidPassword: false,
            validInfo: strings.invalidEmail + " " + strings.invalidPassword,
            result: null,
            show: true
        };
        const handleChangePassword = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPassword: isValid });
        const handleChangeEmail = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidEmail: isValid });
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
        this.handleChangeEmail = handleChangeEmail.bind(this, 'email');
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setUser(userToken, userName, roles) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('auth', userToken);
        localStorage.setItem('permissions', JSON.stringify(roles));
        // TODO pokud má již vytvořenou doménu, uloží ji do localStorage
        if (localStorage.getItem('domainName') !== "undefined" && localStorage.getItem('domainName') != null) {
            window.location.href = "/";
        } else {
            window.location.href = "/#/my-profile";
        }

    }

    async validate() {
        let info = "";
        if (this.state.isValidEmail && this.state.isValidPassword) {
            var response = await dataProvider.postDataUnauth('authenticate/Login', {
                email: this.state.email,
                password: this.state.password
            })
            if (response[0] === 200) {
                //TODO Roles
                const roles = ['ROLE_ADMIN', 'ROLE_USER']
                await this.setUser(response[2], response[3], roles);
                this.setState({ show: false, isValidForm: true });
                return ([strings.loginSuccess, false, false, false]);
            } else {
                this.setState({ show: true });
                return ([response[1], false, true, false]);
            }
        } else {
            if (!this.state.isValidEmail) {
                info = strings.invalidEmail;
            }
            if (!this.state.isValidPassword) {
                if (info !== "")
                    info += ", ";
                info += strings.invalidPassword
            }
            if (info !== "")
                info += ", ";
            info += strings.loginError
            this.setState({ show: true });
            return ([info, false, true, false]);
        }
    }

    handleReset() {
        this.setState({ password: "", userName: "" });
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

    toRegistration() {
        this.props.onResultChange('', this.state.show, !this.state.show, !this.state.show, '');
    }

    toForgottenPass() {
        this.props.onResultChange('', !this.state.show, !this.state.show, this.state.show, '');
    }

    render() {
        return (
            <form className="" id="loginForm">
                <div className="h3">{strings.titleLogin}</div>
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
                <Button type="submit" onClick={this.handleSubmit} variant="contained" className="width300" theme={MyTheme}> {strings.login} </Button>
                <div className="divLink" onClick={() => this.toForgottenPass()} variant="contained"> {strings.forgottenPassword} </div>
                <div className="divLink" onClick={() => this.toRegistration()} variant="contained"> {strings.newRegistration} </div>
            </form>
        );
    }
}