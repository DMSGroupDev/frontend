import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { List, Edit, Create, Datagrid, SimpleList, TextField, EditButton, DeleteButton, TextInput, SimpleForm, usePermissions} from 'react-admin';
import strings from '../../localization/Localization.js';

const Title = ({ record }) => {
        return <span>{strings.domainEdit} {record ? `"${record.username}"` : ''}</span>;
    };

const filters = [
    <TextInput source="q" label={strings.search} alwaysOn variant="outlined"/>,
];

export const DomainList = ({...props }) => {
    const { permissions } = usePermissions('ROLE_ADMIN');
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List title={strings.domains} filters={filters} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `email: ${record.email}`}
                    /*tertiaryText={record => new Date(record.published_at).toLocaleDateString()}*/
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="domainName" />
                    {permissions && <EditButton />}
                    {permissions && <DeleteButton />}
                        
                </Datagrid>)}
    </List>
)};

export const DomainEdit = props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" variant="outlined"/>
            <TextInput source="domainName" label={strings.domainName} variant="outlined"/>
        </SimpleForm>
    </Edit>
);

export const DomainCreate = props => (
    <Create title={strings.domainAdd} {...props}>
        <SimpleForm>
            <TextInput source="domainName" label={strings.domainName} variant="outlined"/>
        </SimpleForm>
    </Create>
);