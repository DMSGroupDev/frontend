import * as React from "react";
import strings from '../localization/Localization.js';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import BasicCard from "../components/common/BasicCard";
import { makeStyles } from '@material-ui/core/styles';
import { Title } from 'react-admin';
import MyProfile from '../pages/MyProfile';

const useStyles = makeStyles({
    parentCard: {
        display: 'flex',
    },
});

const Dashboard = () => {
    const classes = useStyles();

    if (localStorage.getItem('domainName') === "undefined" || localStorage.getItem('domainName') == null) {
        return (<MyProfile />)
    } else {
        return (
            <Card>
                <Title title={strings.dashboard} />
                <CardHeader title={strings.dashboardTitle} />
                <CardContent> {strings.dashboardContent}</CardContent>
                <Card className={classes.parentCard}>
                    <BasicCard
                        name={strings.users}
                        description={strings.usersDescription}
                        link={strings.usersGoTo}
                        url="/users">
                    </BasicCard>
                </Card>
            </Card>
        )
    }
};
export default Dashboard