import React, { Component } from 'react';
import strings from '../localization/Localization.js';

export default class Admin extends Component {
    render() {
        return (
            <form className="" id="admin">
                <div className="h2">{strings.titleAdmin} supertajný</div>
            </form>
        );
    }
}