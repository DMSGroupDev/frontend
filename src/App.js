import React, { Component } from 'react';
import RegistrationForm from './form/Registration.js';
import Message from './common/Message.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import strings from './localization/Localization.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        message: null, 
        showHideRegistrationForm: false,};
    this.propagateMessage = (message, showHideRegistrationForm) => this.setState({ message, showHideRegistrationForm});
  }

  hideComponent(name) {
    switch (name) {
      case "showHideRegistrationForm":
        this.setState({ showHideRegistrationForm: !this.state.showHideRegistrationForm });
        break;
      default:
        break;
    }
  }

  componentDidUpdate(){
    if (this.state.message){
      setTimeout(() => this.setState({message:""}), 6000);
    }
  }

  render(){
    const title = strings.title, { showHideRegistrationForm } = this.state;

    return (
      <div className="App">
        <h1>{title}</h1>
        <div className="text-secondary message"><Message value={this.state.message}/></div>
        {!showHideRegistrationForm && (<button className="btn btn-sm btn-light" onClick={() => this.hideComponent("showHideRegistrationForm")}> To registration </button>)}
        {showHideRegistrationForm && (<RegistrationForm onResultChange={this.propagateMessage } />)}
      </div>
    );
  }   
}

