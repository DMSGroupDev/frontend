import React, { Component } from 'react';
import RegistrationForm from './form/Registration.js';
import Login from './form/Login.js';
import Account from './sites/Account.js';
import Message from './common/Message.js';
import './css/App.css';
import './css/Form.css';
import './css/SwitchLanguage.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import strings from './localization/Localization.js';
import SwitchLanguage from './common/SwitchLanguage.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      showHideRegistrationForm: false,
      showHideLogin: true,
      language: 'en',
      token: ''
    };
    this.propagateMessage = (message, showHideRegistrationForm, showHideLogin, token) => this.setState({ message, showHideRegistrationForm, showHideLogin, token});
    this.propagateLanguage = (language) => this.setState({ language });
  }

  hideComponent(name) {
    switch (name) {
      case "showHideRegistrationForm":
        this.setState({ showHideRegistrationForm: !this.state.showHideRegistrationForm });
        break;
      case "showHideLogin":
        this.setState({ showHideLogin: !this.state.showHideLogin });
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
    const { token, showHideRegistrationForm } = this.state;
    if (!token) {
      return (
        <div className="App">
          <h1>{strings.title}</h1>
          <SwitchLanguage value={this.state.language} onLanguageChange={this.propagateLanguage} />
          <div className="text-secondary message"><Message value={this.state.message} /></div>
          {!showHideRegistrationForm && (
            <div>
              <Login onResultChange={this.propagateMessage} />
              
            </div>)}
          {showHideRegistrationForm && (<RegistrationForm onResultChange={this.propagateMessage} />)}
        </div>
        )
    }
    return (
      <div className="App">
        <h1>{strings.title}</h1>
        <SwitchLanguage value={this.state.language} onLanguageChange={this.propagateLanguage} />
        <div className="text-secondary message"><Message value={this.state.message} /></div>
        <div>First info after login</div>
        <BrowserRouter>
          <Switch>
            <Route path="/account">
              <Account onResultChange={this.propagateMessage} />
            </Route>
            <Route path="/registration">
              <RegistrationForm onResultChange={this.propagateMessage} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

