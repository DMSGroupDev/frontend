import React, { Component } from 'react';
import strings from '../localization/Localization.js';
import { Card, CardHeader, CardContent} from '@material-ui/core';
import { Title } from 'react-admin';
import Button from '@mui/material/Button';
import MyTheme from '../components/common/MyTheme.js';
import { Input } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import MyNotifyAlert from '../components/common/MyNotifyAlert.js';
import dataProvider from '../helpers/dataProvider.js';

const TableCellStyled = styled(TableCell)(({ theme }) => ({
    border: 'none',
    fontSize: '1.1em',
    width: '1em',
    paddingLeft: 0,
    paddingRight: 0,
}));

export default class MyProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            domainName: '',
            alertInfo: '',
            alertType: '',
            showAlert: false
        }

        this.addDomain = this.addDomain.bind(this)
        this.propagateNotifyAlert = (alertInfo, alertType) => this.setState({ alertInfo, alertType });

        if (localStorage.getItem('domainName') !== "undefined" && localStorage.getItem('domainName') != null) {
            this.setState({ domainName: localStorage.getItem('domainName') })
        }
    }
    
    async addDomain(e) {
        e.preventDefault()
        var newDomain = this.state.domainName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "-").replace(".", "-").replace(",", "-");
        if (newDomain !== "") {
            var response = await dataProvider.postData('identity/ValidationRegisterDomain', {domainName: newDomain})
            if (response[0] === 200) {
                response = await dataProvider.postData('identity/RegisterDomain', { domainName: newDomain, email: "seznam@seznam.cz" })
                if (response[0] === 200) {
                    localStorage.setItem('domainName', newDomain);
                    this.setState({ domainName: '' })
                } else {
                    this.setState({ alertInfo: strings.domainError, alertType: 'warning', showAlert: true });
                    setTimeout(() => this.setState({ showAlert: false }), 600);
                }
            } else {
                this.setState({ alertInfo: strings.domainDuplicate, alertType: 'warning', showAlert: true });
                setTimeout(() => this.setState({ showAlert: false }), 600);
            }   
        } else {
            this.setState({ alertInfo: strings.domainEmpty, alertType: 'warning', showAlert: true });
            setTimeout(() => this.setState({ showAlert: false }), 600);
        }
    }

    editUser(e) {
        e.preventDefault()
        //TODO save changes to DB
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    // TODO GET (and show) Name, Lastname and Email from DB
    render() {
        if (localStorage.getItem('domainName') !== "undefined" && localStorage.getItem('domainName') != null) {
            return (
                <Card>
                    <Title title={strings.myProfile} />
                    <CardHeader title={strings.myProfile} />
                    <CardContent style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCellStyled>{strings.userName}:</TableCellStyled>
                                        <TableCellStyled>{localStorage.getItem('userName')}</TableCellStyled>
                                    </TableRow>
                                    <TableRow>
                                        <TableCellStyled>{strings.name}:</TableCellStyled>
                                        <TableCellStyled><Input name="firstName" aria-describedby={strings.Name} style={{ width: 200 }} value={this.state.firstName} onChange={this.handleChange} /></TableCellStyled>
                                    </TableRow>
                                    <TableRow>
                                        <TableCellStyled>{strings.surname}:</TableCellStyled>
                                        <TableCellStyled><Input name="lastName" aria-describedby={strings.lastName} style={{ width: 200 }} value={this.state.secondName} onChange={this.handleChange} /></TableCellStyled>
                                    </TableRow>
                                    <TableRow>
                                        <TableCellStyled>{strings.email}:</TableCellStyled>
                                        <TableCellStyled><Input name="email" aria-describedby={strings.Email} style={{ width: 200 }} value={this.state.email} onChange={this.handleChange} /></TableCellStyled>
                                    </TableRow>
                                    <TableRow>
                                        <TableCellStyled>{strings.domain}:</TableCellStyled>
                                        <TableCellStyled>{localStorage.getItem('domainName')}</TableCellStyled>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button type="submit" onClick={this.editUser} variant="contained" style={{ marginTop: 10, backgroundColor: MyTheme.palette.primary.main }}> {strings.profilSave} </Button>
                    </CardContent>
                </Card >
            )
        } else {
            return (
                <Card>
                    <Title title={strings.domainCreate} />
                    <CardHeader title={strings.domainTitle} />
                    <CardContent style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {strings.domainInfo}
                        <TableContainer>
                            <Table aria-label="simple table" >
                                <TableBody>
                                    <TableRow>
                                        <TableCellStyled>{strings.domainName}:</TableCellStyled>
                                        <TableCellStyled><Input name="domainName" aria-describedby={strings.domainName} style={{ width: 200 }} onChange={this.handleChange} /></TableCellStyled>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ marginTop: 10, color: MyTheme.palette.warning.dark, width: '100%' }}>
                            {strings.domainNotice}
                        </div>
                        <Button type="submit" onClick={this.addDomain} variant="contained" style={{ marginTop: 10, backgroundColor: MyTheme.palette.primary.main }}> {strings.domainSave} </Button>
                    </CardContent>
                    <MyNotifyAlert alertInfo={this.state.alertInfo} alertType={this.state.alertType} showAlert={this.state.showAlert} ></MyNotifyAlert>
                </Card >
            )
        }        
    }
}