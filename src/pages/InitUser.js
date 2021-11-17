import React, { Component } from 'react';
import RegistrationForm from '../components/form/Registration.js';
import ForgottenPassword from '../components/form/ForgottenPassword.js';
import Login from '../components/form/Login.js';
import Message from '../components/common/Message.js';
import '../css/App.css';
import '../css/Form.css';
import '../css/SwitchLanguage.css';
import '../css/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import strings from '../localization/Localization.js';
import SwitchLanguage from '../components/common/SwitchLanguage.js';
import MyTheme from '../components/common/MyTheme.js';
import dataProvider from '../helpers/dataProvider.js';

export default class InitUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: sessionStorage.getItem('confirmMessage'),
            showHideRegistrationForm: false,
            showHideLogin: true,
            showHideForgottenPassword: false,
            language: '',
        };
        this.propagateMessage = (message, showHideRegistrationForm, showHideLogin, showHideForgottenPassword) => this.setState({ message, showHideRegistrationForm, showHideLogin, showHideForgottenPassword });
        this.propagateLanguage = (language) => this.setState({ language });
    }
    getUser() {
        const userToken = localStorage.getItem('userToken');
        const userName = localStorage.getItem('userName');
        return [(userToken != null ? userToken : ''), (userName != null ? userName : '')]
    }

    logout() {
        const language = localStorage.getItem('language');
        localStorage.clear();
        localStorage.setItem('language', language);
        dataProvider.postData('Logout')
        window.location.reload();
    }

    hideComponent(name) {
        switch (name) {
            case "showHideRegistrationForm":
                this.setState({ showHideRegistrationForm: !this.state.showHideRegistrationForm });
                break;
            case "showHideLogin":
                this.setState({ showHideLogin: !this.state.showHideLogin });
                break;
            case "showHideForgottenPassword":
                this.setState({ showHideForgottenPassword: !this.state.showHideForgottenPassword });
                break;
            default:
                break;
        }
    }

    componentDidUpdate() {
        if (this.state.message) {
            setTimeout(() => this.setState({ message: "" }), 6000);
        }
    }

    render() {
        const { showHideRegistrationForm } = this.state;
        const { showHideLogin } = this.state;
        const { showHideForgottenPassword } = this.state;
        //const userData = this.getUser();
        //const userToken = userData[0];
        //const userName = userData[1];
        const language = localStorage.getItem('language');

        return (
            <div className="initUser" theme={MyTheme}>
                <div className="text-secondary message"><Message value={this.state.message} /></div>
                <div>
                    <div><SwitchLanguage value={language} onLanguageChange={this.propagateLanguage} /></div>
                    {!showHideRegistrationForm && showHideLogin && !showHideForgottenPassword && (
                        <div>
                            <Login onResultChange={this.propagateMessage} />
                        </div>)}
                    {showHideRegistrationForm && !showHideLogin && !showHideForgottenPassword && (<RegistrationForm onResultChange={this.propagateMessage} />)}
                    {!showHideRegistrationForm && !showHideLogin && showHideForgottenPassword && (<ForgottenPassword onResultChange={this.propagateMessage} />)}
                </div>
            </div>
        )
    }
}