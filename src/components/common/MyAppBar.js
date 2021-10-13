import * as React from 'react';
import { useState } from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MyUserMenu from './MyUserMenu';
import SwitchLanguage from './SwitchLanguage.js';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const MyAppBar = props => {
    const classes = useStyles();
    const [language, setLanguage] = useState(0);
    const propagateLanguage = (language) => setLanguage({ language });

    return (
        <AppBar {...props} userMenu={<MyUserMenu />}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            DMS
            <span className={classes.spacer} />
            <SwitchLanguage value={language} onLanguageChange={propagateLanguage} />
        </AppBar>
    );
};

export default MyAppBar;