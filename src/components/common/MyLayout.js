import * as React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MyNotification from './MyNotification';
import MyMenu from './MyMenu';

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} notification={MyNotification} menu={MyMenu}/>;

export default MyLayout;