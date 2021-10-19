import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { List, Edit, Create, Datagrid, SimpleList, TextField, EmailField, UrlField, EditButton, DeleteButton, TextInput, SimpleForm, ReferenceInput, SelectInput, usePermissions} from 'react-admin';
import strings from '../../localization/Localization.js';

const Title = ({ record }) => {
        return <span>{strings.userEdit} {record ? `"${record.name}"` : ''}</span>;
    };

const filters = [
    <TextInput source="q" label={strings.search} alwaysOn variant="outlined" size="small"/>,
    <ReferenceInput source="userId" label={strings.user} reference="users" allowEmpty variant="outlined">
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const UserList = ({...props }) => {
    const { permissions } = usePermissions('ROLE_ADMIN');
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <List title={strings.users} filters={filters} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `email: ${record.email}`}
                    /*tertiaryText={record => new Date(record.published_at).toLocaleDateString()}*/
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="name" label={strings.userName} />
                    {/*<TextField source="username" />*/}
                        <EmailField source="email" label={strings.email}/>
                    {/*<TextField source="address.street" />*/}
                        <TextField source="phone" label={strings.phone}/>
                        <UrlField source="website" label={strings.website}/>
                        <TextField source="company.name" label={strings.companyName}/>
                    {permissions && <EditButton />}
                    {permissions && <DeleteButton />}
                        
                </Datagrid>)}
    </List>
)};

export const UserEdit = props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" variant="outlined"/>
            <TextInput source="name" variant="outlined" label={strings.name}/>
            <TextInput source="username" variant="outlined" label={strings.userName}/>
            <TextInput source="email" variant="outlined" label={strings.email}/>
            <TextInput source="address.street" variant="outlined" label={strings.street}/>
            <TextInput source="phone" variant="outlined" label={strings.phone}/>
            <TextInput source="website" variant="outlined" label={strings.website}/>
            <TextInput source="company.name" variant="outlined" label={strings.companyName}/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create title={strings.userAdd}{...props}>
        <SimpleForm>
            <TextInput source="name" variant="outlined" label={strings.name}/>
            <TextInput source="username" variant="outlined" label={strings.userName}/>
            <TextInput source="email" variant="outlined" label={strings.email}/>
            <TextInput source="address.street" variant="outlined" label={strings.street}/>
            <TextInput source="phone" variant="outlined" label={strings.phone}/>
            <TextInput source="website" variant="outlined" label={strings.website}/>
            <TextInput source="company.name" variant="outlined" label={strings.companyName}/>
        </SimpleForm>
    </Create>
);