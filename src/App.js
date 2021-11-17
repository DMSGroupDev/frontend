import * as React from "react";
import { Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './pages/Dashboard';
import authProvider from './helpers/authProvider.js';
import LoginPage from './pages/InitUser.js';
import { UserList, UserEdit, UserCreate } from './components/admin/User';
import UserIcon from '@material-ui/icons/Group';
import MyLayout from './components/common/MyLayout.js'
import MyTheme from './components/common/MyTheme.js';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './localization/englishMessages';
import czechMessages from './localization/czechMessages';
import './css/MuiCustom.css';
import strings from './localization/Localization.js';
import customRoutes from './helpers/customRoutes';
import { Route } from 'react-router-dom';
import Confirm from './pages/Confirm'
//import dataProvider from './helpers/dataProvider.js'

const messages = {
    cs: czechMessages,
    en: englishMessages,
};
const i18nProvider = polyglotI18nProvider(locale => messages[localStorage.getItem('language')]);

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
        <Admin
            loginPage={LoginPage}
            dashboard={Dashboard}
            layout={MyLayout}
            theme={MyTheme}
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            customRoutes={customRoutes}
        >
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} options={{ label: strings.users }} />
        <Route exact path='/Confirm/:confirm' component={Confirm} />
        </Admin>
)

export default App;