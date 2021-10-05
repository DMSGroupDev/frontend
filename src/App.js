import React, { Component } from 'react';
import RegistrationForm from './components/form/Registration.js';
import Login from './components/form/Login.js';
import Message from './components/common/Message.js';
import './css/App.css';
import './css/Form.css';
import './css/SwitchLanguage.css';
import './css/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import strings from './localization/Localization.js';
import SwitchLanguage from './components/common/SwitchLanguage.js';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard.js';
import AdminPage from './pages/Administration.js';
import RoleBasedRouting from './helpers/RoleBaseRouting.js'
import AccountIcon from "@material-ui/icons/AccountBox";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      showHideRegistrationForm: false,
      showHideLogin: true,
      language: '',
    };
    this.propagateMessage = (message, showHideRegistrationForm, showHideLogin) => this.setState({ message, showHideRegistrationForm, showHideLogin });
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
    const userData = this.getUser();
    const userToken = userData[0];
    const userName = userData[1];
    const language = localStorage.getItem('language');
    if (!userToken) {
      return (
        <div className="App">
          <div className="logLine">
            <div className="logLeft">
              <div className="textCentered">
                <SwitchLanguage value={language} onLanguageChange={this.propagateLanguage} />
              </div>
            </div>
            <div className="logCenter">{strings.title}</div>
            <div className="logRight">
            </div>
          </div>
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
        <div className="logLine">
          <div className="logLeft">
              <SwitchLanguage value={language} onLanguageChange={this.propagateLanguage} />
          </div>
          <div className="logCenter">{strings.title}</div>
          <div className="logRight">
            <div className="textCentered">
              <AccountIcon />&nbsp;{userName}
            </div>
            <div>
              <button type="submit" className="btn btn-sm btnLight" onClick={this.logout}> {strings.logout} </button>
            </div>
          </div>
        </div>
        <div className="text-secondary message"><Message value={this.state.message} /></div>
        <BrowserRouter exact path="/">
          <Redirect to="/dashboard" />
          <Switch>
            <RoleBasedRouting exact path="/dashboard" component={Dashboard} roles={['ROLE_USER', 'ROLE_ADMIN']} />
            <RoleBasedRouting exact path="/administration" component={AdminPage} roles={['ROLE_ADMIN']} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}