import * as React from "react";
import { Route } from 'react-router-dom';
import Settings from '../pages/Settings';
import MyProfile from '../pages/MyProfile';
import InviteUsers from '../pages/InviteUsers';
import Confirm from '../pages/Confirm'

const customRoutes = [
    <Route exact path="/settings" component={Settings} />,
    <Route exact path="/my-profile" component={MyProfile} />,
    <Route exact path="/invite-users" component={InviteUsers} />,
    <Route exact path='/Confirm/:confirm' component={Confirm} noLayout/>
];

export default customRoutes;