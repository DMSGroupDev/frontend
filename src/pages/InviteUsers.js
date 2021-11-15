import React, { Component } from 'react';
import strings from '../localization/Localization.js';
import { Card, CardHeader, CardContent } from '@material-ui/core';
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
import MyProfile from '../pages/MyProfile';
import * as XLSX from 'xlsx';

var validator = require("email-validator");

const TableCellStyled = styled(TableCell)(({ theme }) => ({
    border: 'none',
    fontSize: '1.1em',
    paddingLeft: 0,
    paddingRight: 0,
}));

export default class InviteUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emails: '',
            emailText: '',
            alertInfo: '',
            alertType: '',
            showAlert: false,
            fileEmails: '',
        }

        this.inviteUsers = this.inviteUsers.bind(this)
        this.setAlert = this.setAlert.bind(this)
        this.propagateNotifyAlert = (alertInfo, alertType) => this.setState({ alertInfo, alertType });

        if (localStorage.getItem('domainName') !== "undefined" && localStorage.getItem('domainName') != null) {
            this.setState({ domainName: localStorage.getItem('domainName') })
        }
    }

    setAlert = (alertType, message) => {
        this.setState({ alertInfo: message, alertType: alertType, showAlert: true });
        setTimeout(() => this.setState({ showAlert: false }), 600);
    }

    handleFileUpload = e => {
        try {
            const file = e.target.files[0];
            if (file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                const reader = new FileReader();
                reader.onload = (evt) => {
                    /* Parse data */
                    const bstr = evt.target.result;
                    const wb = XLSX.read(bstr, { type: 'binary' });
                    /* Get first worksheet */
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                    var dataArr = data.split(/\r\n|\n/), i;
                    var allData = "";
                    for (i = 0; i < dataArr.length; i++) {
                        if (dataArr[i].trim() !== "")
                            allData = allData + dataArr[i].trim() + ", "
                    }
                    this.setState({ emails: allData.substring(0, allData.length - 2) });
                };
                reader.readAsBinaryString(file);
            } else {
                this.setAlert('error', strings.invalidFileFormat)
            }
        } catch (err) {
            this.setAlert('error', strings.invalidFile)
        }
    }

    inviteUsers = (e) => {
        e.preventDefault()
        if (this.state.emails !== "") {
            var emailsArr = this.state.emails.split(","), i;
            var invalidEmails = "";
            var emailInfo = "";
            for (i = 0; i < emailsArr.length; i++) {
                if (!validator.validate(emailsArr[i].trim())) {
                    if (emailInfo === ""){
                        invalidEmails = emailsArr[i].trim();
                        emailInfo = strings.emailInvalid
                    } else {
                        invalidEmails = invalidEmails + ", " + emailsArr[i];
                        emailInfo = strings.emailsInvalid
                    }
                }
            }
            if (emailInfo !== ""){
                this.setAlert('error', invalidEmails + emailInfo)
            }
            else {
                //TODO send to create emails
                this.setAlert('success', strings.emailValid)
            }
        } else {
            this.setAlert('warning', strings.emailsEmpty)
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    //TODO LOAD DEFAULT TEXT
    render() {
        if (localStorage.getItem('domainName') === "undefined" || localStorage.getItem('domainName') == null) {
            return (<MyProfile />)
        } else {
            return (
                <Card>
                    <Title title={strings.inviteUsers} />
                    <CardHeader title={strings.inviteUsers} />
                    <CardContent style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {strings.inviteUsersInfo}
                        <TableContainer>
                            <Table aria-label="simple table" >
                                <TableBody>
                                    <TableRow>
                                        <TableCellStyled style={{ width: 100 }}>{strings.emails}:</TableCellStyled>
                                        <TableCellStyled style={{ width: 200 }}><Input name="emails" aria-describedby={strings.emails} style={{ width: 200 }} onChange={this.handleChange} value={this.state.emails}/></TableCellStyled>
                                        <TableCellStyled style={{ paddingLeft: 5 }}>
                                            <label htmlFor="contained-button-file">
                                                <input
                                                    type="file"
                                                    accept=".csv,.xlsx,.xls"
                                                    onChange={this.handleFileUpload}
                                                    style={{ display: 'none' }}
                                                    id="contained-button-file"
                                                />
                                                <Button component="span" size="small" theme={MyTheme}>
                                                    {strings.upladFile}
                                                </Button>
                                            </label>
                                        </TableCellStyled>
                                    </TableRow>
                                    <TableRow>
                                        <TableCellStyled>{strings.emailText}:</TableCellStyled>
                                        <TableCellStyled style={{ width: 200 }}><Input name="emailText" aria-describedby={strings.emailText} style={{ width: 200 }} onChange={this.handleChange} /></TableCellStyled>
                                        <TableCellStyled></TableCellStyled>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button type="submit" onClick={this.inviteUsers} variant="contained" style={{ marginTop: 10, backgroundColor: MyTheme.palette.primary.main }}> {strings.inviteUsers} </Button>
                    </CardContent>
                    <MyNotifyAlert alertInfo={this.state.alertInfo} alertType={this.state.alertType} showAlert={this.state.showAlert} ></MyNotifyAlert>
                </Card >
            )
        }
    }
}