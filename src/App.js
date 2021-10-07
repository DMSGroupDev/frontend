import * as React from "react";
import { Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './pages/Dashboard';
import authProvider from './helpers/authProvider.js';
import LoginPage from './pages/InitUser.js';
import { UserList } from './components/admin/Users';
import MyLayout from './components/common/MyLayout.js'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
    <Admin 
        loginPage={LoginPage} 
        dashboard={Dashboard} 
        layout={MyLayout} 
        authProvider={authProvider} 
        dataProvider={dataProvider}
    >
        <Resource name="users" list={UserList} />
    </Admin>
)

export default App;