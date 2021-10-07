import * as React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MyNotification from './MyNotification';

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} notification={MyNotification}/>;

export default MyLayout;