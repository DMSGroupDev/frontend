import React, { Component } from 'react';
//import strings from '../localization/Localization.js';
import { UnlockAccess } from '../helpers/UnlockAccess.js';
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
    render() {
        return (
            <form className="dashboardContainer" id="account">
                <UnlockAccess request={['ROLE_ADMIN']}>
                    <div className="boxContainter">
                        <Link to="/administration" className="box">Domény</Link>
                    </div>
                </UnlockAccess>
                <div className="boxContainter">
                </div>
            </form>
        );
    }
}