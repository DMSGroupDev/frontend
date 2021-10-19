import * as React from "react";
import strings from '../localization/Localization.js';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import BasicCard from "../components/common/BasicCard";
import { makeStyles } from '@material-ui/core/styles';
import { Title } from 'react-admin';

const useStyles = makeStyles({
    parentCard: {
        display: 'flex',
    },
});

const Dashboard = () => {
    const classes = useStyles();
    return(
        <Card>
            <Title title={strings.dashboard} />
            <CardHeader title={strings.dashboardTitle} />
            <CardContent> {strings.dashboardContent}</CardContent>
            <Card className = {classes.parentCard}>
                <BasicCard
                    name = {strings.domains}
                    description= {strings.domainDescription}
                    link={strings.domainGoTo}
                    url="/domains">
                </BasicCard>
                <BasicCard 
                    name= {strings.users}
                    description= {strings.usersDescription}
                    link={strings.usersGoTo}
                    url="/users">
                </BasicCard>
            </Card>
        </Card>
    )
};
export default Dashboard