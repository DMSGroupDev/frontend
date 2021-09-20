import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/form/Login.js';
import { GrantPermission } from './GrantPermission.js';

export default class RoleBaseRouting extends Component {

    render() {
        return (
            <div>
                {GrantPermission(this.props.roles) && (
                    <Route
                        render={() => (
                            <this.props.component />
                        )}
                    />
                )},
                {!GrantPermission(this.props.roles) && (
                    <Route
                        render={() => (
                            <Login />
                        )}
                    />
                )}
            </div>
        )
    }
}
