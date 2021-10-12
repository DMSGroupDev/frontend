import React, { Component } from 'react';
import MyTheme from '../common/MyTheme.js';

export default class Message extends Component {
    render() {
        const message = this.props.value;
        if (message) return <div className="Message text-danger" theme={MyTheme}>{message}</div>;
        else return null;
    }
}