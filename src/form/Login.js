import React, { Component } from 'react';
import Input from './Input';
import { render } from '@testing-library/react';
import strings from '../localization/Localization.js';

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
        this.handleChangeName = handleChangeName.bind(this, 'name');
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {
        let info = "";
        if (this.state.isValidName && this.state.isValidPassword) {
            // TODO check username and password
            info = strings.loginSuccess;
            this.setState({ show: false, isValidForm: true });

            // TODO SET TOKEN
            return ([info, false, false, 'testToken123']);
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
            return ([info, true, false, '']);
        }
    }

    handleReset() {
        this.setState({ password: "", userName: "" });
    };

    handleSubmit(event) {
        event.preventDefault();
        var result = this.validate();
        this.setState({ result: result[0] });
        this.props.onResultChange(result[0], result[1], result[2], result[3]);
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
                <div className="formRedirect">{strings.newRegistration}</div>
                <button className="btn btn-sm btn-light" onClick={() => this.toRegistration()}> {strings.toRegistration} </button>
            </form>
        );
    }
}