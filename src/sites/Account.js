import React, { Component } from 'react';
import strings from '../localization/Localization.js';

export default class Account extends Component {
    render() {
        return (
            <form className="" id="account">
                <div className="h2">{strings.titleAccount}</div>
            </form>
        );
    }
}