import * as React from "react";
import { Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './pages/Dashboard';
import authProvider from './helpers/authProvider.js';
import LoginPage from './pages/InitUser.js';
import { DomainList, DomainEdit, DomainCreate } from './components/admin/Domain';
import { UserList, UserEdit, UserCreate } from './components/admin/User';
import UserIcon from '@material-ui/icons/Group';
import DomainIcon from '@material-ui/icons/Domain';
import MyLayout from './components/common/MyLayout.js'
import MyTheme from './components/common/MyTheme.js';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './localization/ra-language-en';
import czechMessages from './localization/ra-language-cs';
import './css/MuiCustom.css';
import strings from './localization/Localization.js';

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
        >
        <Resource name="domains" list={DomainList} edit={DomainEdit} create={DomainCreate} icon={DomainIcon} options={{ label: strings.domains }} />
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} options={{ label: strings.users }}/>
        </Admin>
)

export default App;