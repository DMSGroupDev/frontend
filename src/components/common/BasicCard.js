import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import MyTheme from './MyTheme.js';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const BasicCard = ({...props}) => {
    const { name, description, link, url} = props;

    return (
        <Card theme={MyTheme} sx={{ width:200, mt:2, ml:2, mb:2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {bull} {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={url}><Button size="small" theme={MyTheme}>{link}</Button></Link>
            </CardActions>
        </Card>
    );
}

export default BasicCard;