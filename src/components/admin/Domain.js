import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { List, Edit, Create, Datagrid, SimpleList, TextField, EditButton, DeleteButton, TextInput, SimpleForm} from 'react-admin';
import { usePermissions } from 'react-admin';

const Title = ({ record }) => {
        return <span>Domain {record ? `"${record.username}"` : ''}</span>;
    };

const filters = [
    <TextInput source="q" label="Search" alwaysOn />,
];

export const DomainList = ({...props }) => {
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
                    <TextField source="username" />
                    {permissions && <EditButton />}
                    {permissions && <DeleteButton />}
                        
                </Datagrid>)}
    </List>
)};

export const DomainEdit = props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="username" label="Domain name"/>
        </SimpleForm>
    </Edit>
);

export const DomainCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" label="Domain name"/>
        </SimpleForm>
    </Create>
);