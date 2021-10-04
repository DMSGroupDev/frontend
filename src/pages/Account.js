import React, { Component } from 'react';
import strings from '../localization/Localization.js';
import { UnlockAccess } from '../helpers/UnlockAccess.js';

export default class Account extends Component {
    render() {
        return (
            <form className="" id="account">
                <div className="h2">{strings.titleAccount}</div>
                <UnlockAccess request={['ROLE_ADMIN']}>
                    <div>info just for admin</div>
                </UnlockAccess>
            </form>
        );
    }
}