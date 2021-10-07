import * as React from "react";
//import strings from '../localization/Localization.js';
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from '@material-ui/core';

const Dashboard = () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        <div className="boxContainter">
            <Link to="/users" className="box">Domény</Link>
        </div>
    </Card>
);
export default Dashboard