import * as React from "react";
import { Route } from 'react-router-dom';
import Settings from '../pages/Settings';

const customRoutes = [
    <Route exact path="/settings" component={Settings} />,
];

export default customRoutes;