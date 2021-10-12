import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { List, Edit, Create, Datagrid, SimpleList, TextField, EmailField, EditButton, DeleteButton, TextInput, SimpleForm, ReferenceInput, SelectInput} from 'react-admin';
import { usePermissions } from 'react-admin';
import MyUrlField from "../common/MyUrlField";

const Title = ({ record }) => {
        return <span>User {record ? `"${record.name}"` : ''}</span>;
    };

const filters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
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
                    <MyUrlField source="website" />
                    <TextField source="company.name" />
                    {permissions && <EditButton />}
                    {permissions && <DeleteButton />}
                        
                </Datagrid>)}
    </List>
)};

export const UserEdit = props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Create>
);