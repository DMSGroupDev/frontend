import * as React from "react";
//import strings from '../localization/Localization.js';

import { Card, CardContent, CardHeader } from '@material-ui/core';
import BasicCard from "../components/common/BasicCard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    parentCard: {
        display: 'flex',
    },
});

const Dashboard = () => {
    const classes = useStyles();
    return(
        <Card>
            <CardHeader title="Welcome to the DMS" />
            <CardContent>Now you can create Domain and manage Users...</CardContent>
            <Card className={classes.parentCard}>
                <BasicCard
                    name="Domain"
                    description="Manage all Domains"
                    link="Go to domains"
                    url="/domains">
                </BasicCard>
                <BasicCard 
                    name="Users" 
                    description="Manage all Users"
                    link="Go to users"
                    url="/users">
                </BasicCard>
            </Card>
        </Card>
    )
};
export default Dashboard