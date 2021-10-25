import * as React from "react";
import { Route } from 'react-router-dom';
import Settings from '../pages/Settings';
import MyProfile from '../pages/MyProfile';

const customRoutes = [
    <Route exact path="/settings" component={Settings} />,
    <Route exact path="/my-profile" component={MyProfile} />,
];

export default customRoutes;