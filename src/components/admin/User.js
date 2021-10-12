import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { List, Edit, Create, Datagrid, SimpleList, TextField, EmailField, UrlField, EditButton, DeleteButton, TextInput, SimpleForm, ReferenceInput, SelectInput} from 'react-admin';
import { usePermissions } from 'react-admin';

const Title = ({ record }) => {
        return <span>User {record ? `"${record.name}"` : ''}</span>;
    };

const filters = [
    <TextInput source="q" label="Search" alwaysOn variant="outlined" size="small"/>,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty variant="outlined">
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const UserList = ({...props }) => {
    const { permissions } = usePermissions('ROLE_ADMIN');
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <List filters={filters} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `email: ${record.email}`}
                    /*tertiaryText={record => new Date(record.published_at).toLocaleDateString()}*/
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="name" label="userName" />
                    {/*<TextField source="username" />*/}
                    <EmailField source="email" />
                    {/*<TextField source="address.street" />*/}
                    <TextField source="phone" />
                    <UrlField source="website" />
                    <TextField source="company.name" />
                    {permissions && <EditButton />}
                    {permissions && <DeleteButton />}
                        
                </Datagrid>)}
    </List>
)};

export const UserEdit = props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" variant="outlined"/>
            <TextInput source="name" variant="outlined"/>
            <TextInput source="username" variant="outlined"/>
            <TextInput source="email" variant="outlined"/>
            <TextInput source="address.street" variant="outlined"/>
            <TextInput source="phone" variant="outlined"/>
            <TextInput source="website" variant="outlined"/>
            <TextInput source="company.name" variant="outlined"/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" variant="outlined"/>
            <TextInput source="username" variant="outlined"/>
            <TextInput source="email" variant="outlined"/>
            <TextInput source="address.street" variant="outlined"/>
            <TextInput source="phone" variant="outlined"/>
            <TextInput source="website" variant="outlined"/>
            <TextInput source="company.name" variant="outlined"/>
        </SimpleForm>
    </Create>
);