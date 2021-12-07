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
            passwordConfirm: "",
            isValidForm: false,
            isValidEmail: false,
            isValidPassword: false,
            isValidPasswordConfirm: false,
            validInfo: strings.invalidName + " " + strings.invalidPassword + " " + strings.invalidPasswordConfirm + " " + strings.invalidPasswordIdentical,
            result: null,
            show: true,
            showPassword: false,
        };
        const handleChangePasswordConfirm = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPasswordConfirm: isValid });
        const handleChangePassword = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidPassword: isValid });
        const handleChangeEmail = (name, value, validInfo, isValid) => this.setState({ [name]: value, validInfo: validInfo, isValidEmail: isValid });
        this.handleChangePasswordConfirm = handleChangePasswordConfirm.bind(this, 'passwordConfirm');
        this.handleChangePassword = handleChangePassword.bind(this, 'password');
        this.handleChangeEmail = handleChangeEmail.bind(this, 'email');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitConfirm = this.handleSubmitConfirm.bind(this);
    }

    async sendResetEmail() {
        let info = "";
        if (this.state.isValidEmail) {
                var response = await dataProvider.postDataUnauth('identity/ForgetPassword', {
                    forgetPasswordCallbackUrl: config.WEB_URL + '/#/confirm/:confirm=password_{0}_{1}',
                    email: this.state.email
                })
                if (response[0] === 200) {
                    this.setState({ show: false });
                    return ([strings.forgotPasswordEmail, false]);
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
            this.setState({ show: true });
            return ([info, true]);
        }
    }

    async setNewPassword() {
        let info = "";
        if (this.state.isValidPassword && this.state.isValidPasswordConfirm && this.state.password === this.state.passwordConfirm) {
                var response = await dataProvider.postDataUnauth('identity/ResetPassword', {
                    userId: localStorage.getItem('userToken'),
                    code: localStorage.getItem('forgotPassToken'),
                    password: this.state.password
                })
                if (response[0] === 200) {
                    this.setState({ show: false });
                    const language = localStorage.getItem('language');
                    localStorage.clear();
                    localStorage.setItem('language', language);
                    return ([strings.forgotPasswordConfirm, false]);
                } else {
                    this.setState({ show: true });
                    return ([response[1], true]);
                }
        } else {
            if (!this.state.isValidPassword) {
                if (info !== "")
                    info += ", ";
                info += strings.invalidPassword
            }
            if (this.state.password !== this.state.passwordConfirm) {
                if (info !== "")
                    info += ", ";
                info += strings.invalidPasswordIdentical
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
        const result = await this.sendResetEmail();
        this.setState({ result: result[0] });
        if (result[1]) {
            this.props.onResultChange(result[0], false, false, true, '');
        } else {
            this.props.onResultChange(result[0], false, true, false, '');
        }
        if (this.state.isValidForm)
            this.handleReset();
        render()
    }

    async handleSubmitConfirm(event) {
        event.preventDefault();
        const result = await this.setNewPassword();
        this.setState({ result: result[0] });
        if (result[1]){
            this.props.onResultChange(result[0], false, false, true, '');
        } else {
            this.props.onResultChange(result[0], false, true, false, '');
        }
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

    componentDidMount() {
        if (localStorage.getItem('forgotPassToken') !== "undefined" && localStorage.getItem('forgotPassToken') != null) {
            this.setState({ showPassword: true });
        } else {
            this.setState({ showPassword: false });
        }
    }

    render() {
        if (!this.state.showPassword) {
            return (
                <form className="" id="forgPassForm">
                    <div className="h3">{strings.forgottenPassword}</div>
                    <Input name="email"
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                        label={strings.email}
                        type="text"
                        required={true} />
                    <Button type="submit" onClick={this.handleSubmit} variant="contained" className="width300" theme={MyTheme}> {strings.generateLinkPassword} </Button>
                    <div className="divLink" onClick={() => this.toLogin()} variant="contained"> {strings.backToLogin} </div>
                    <div className="divLink" onClick={() => this.toRegistration()} variant="contained"> {strings.newRegistration} </div>
                </form>
            );
        } else {
            return (
                <form className="" id="forgPassForm">
                    <div className="h3">{strings.forgottenPassword}</div>
                    <Input name="password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        label={strings.newPassword}
                        type="password"
                        required={true} />
                    <Input name="passwordConfirm"
                        value={this.state.passwordConfirm}
                        onChange={this.handleChangePasswordConfirm}
                        label={strings.newPasswordConfirm}
                        type="password"
                        required={true} />
                    <Button type="submit" onClick={this.handleSubmitConfirm} variant="contained" className="width300" theme={MyTheme}> {strings.resetPassword} </Button>
                    <div className="divLink" onClick={() => this.toLogin()} variant="contained"> {strings.backToLogin} </div>
                    <div className="divLink" onClick={() => this.toRegistration()} variant="contained"> {strings.newRegistration} </div>
                </form>
            );
        }
    }
}