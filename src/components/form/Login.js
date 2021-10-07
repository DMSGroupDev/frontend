import React, { Component } from 'react';
import Input from './Input';
import { render } from '@testing-library/react';
import strings from '../../localization/Localization.js';

export default class Login extends Component {
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
        // TODO pokud nemá žádnou doménu přesměruje na create domain
        window.location.href = "/";
    }

    validate() {
        let info = "";
        if (this.state.isValidName && this.state.isValidPassword) {
            // TODO check username and password
            info = strings.loginSuccess;
            this.setState({ show: false, isValidForm: true });

            // TODO GET TOKEN
            const userName = this.state.userName
            const roles = ['ROLE_ADMIN', 'ROLE_USER']
            this.setUser('testToken123', userName, roles);

            return ([info, false, false]);
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
            return ([info, false, true]);
        }
    }

    handleReset() {
        this.setState({ password: "", userName: "" });
    };

    handleSubmit(event) {
        event.preventDefault();
        const result = this.validate();
        this.setState({ result: result[0] });
        this.props.onResultChange(result[0], result[1], result[2]);
        if (this.state.isValidForm)
            this.handleReset();
        render()
    }

    toRegistration() {
        this.props.onResultChange('', this.state.show, !this.state.show, '');
    }

    render() {
        return (
            <form className="" id="loginForm">
                <div className="h2">{strings.titleLogin}</div>
                <Input name="userName"
                    value={this.state.userName}
                    onChange={this.handleChangeName}
                    label={strings.userName}
                    type="text"
                    required={true} />
                <Input name="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    label={strings.password}
                    type="password"
                    required={true} />
                <input type="submit" className="btn btn-sm btn-light" value={strings.login} onClick={this.handleSubmit} />
                <div className="p-1">{strings.newRegistration}</div>
                <button className="btn btn-sm btn-light" onClick={() => this.toRegistration()}> {strings.toRegistration} </button>
            </form>
        );
    }
}