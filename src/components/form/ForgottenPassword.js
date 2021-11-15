import React, { Component } from 'react';
import Input from './Input';
import { render } from '@testing-library/react';
import strings from '../../localization/Localization.js';
import Button from '@mui/material/Button';
import MyTheme from '../common/MyTheme.js';
//import dataProvider from '../../helpers/dataProvider.js';

export default class ForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            isValidForm: false,
            isValidName: false,
            isValidPassword: false,
            validInfo: strings.invalidName + " " + strings.invalidPassword,
            result: null,
            show: true
        };
        const handleChangePassword = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPassword: isValid });
        const handleChangeName = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidName: isValid });
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
        this.handleChangeName = handleChangeName.bind(this, 'userName');
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

    validate() {
        let info = "";
        if (this.state.isValidName && this.state.isValidPassword) {
            // TODO check username and password
            info = strings.confirmResetPassword;
            this.setState({ show: false, isValidForm: true });

            return ([info, false, false, false]);
        } else {
            if (!this.state.isValidName) {
                info = strings.invalidName;
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

    handleSubmit(event) {
        event.preventDefault();
        const result = this.validate();
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
                <Input name="userName"
                    value={this.state.userName}
                    onChange={this.handleChangeName}
                    label={strings.userName}
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