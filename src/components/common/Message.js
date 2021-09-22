import React, { Component } from 'react';

export default class Message extends Component {
    render() {
        const message = this.props.value;
        if (message) return <div className="Message text-danger">{message}</div>;
        else return null;
    }
}