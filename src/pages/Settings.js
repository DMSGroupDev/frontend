import React, { Component } from 'react';
import strings from '../localization/Localization.js';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Title } from 'react-admin';
import ColorPicker from 'material-ui-color-picker'
import Button from '@mui/material/Button';

var primaryColor = "#79B4B7";
if (localStorage.getItem('primaryColor') !== "undefined") {
    primaryColor = localStorage.getItem('primaryColor')
}

var secondaryColor = "#364F6B";
if (localStorage.getItem('secondaryColor') !== "undefined") {
    secondaryColor = localStorage.getItem('secondaryColor')
}

export default class Settings extends Component{
    setPrimaryColor(color) {
        if (typeof color !== "undefined") {
            var primary = document.getElementById('primaryColorDiv');
            primary.style.color = color;
            primaryColor = color
        }

    }
    setSecondaryColor(color) {
        if (typeof color !== "undefined") {
            var secondary = document.getElementById('secondaryColorDiv');
            secondary.style.backgroundColor = color;
            secondaryColor = color
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('primaryColor', primaryColor);
        localStorage.setItem('secondaryColor', secondaryColor);
        // TODO SAVE TO DB
        window.location.reload();
    }

    render(){
        return (
            <Card>
                <Title title={strings.settings} />
                <CardHeader title={strings.settings} />
                <CardContent style={{ minHeight: '600px'}}>
                    <h5>{strings.colorSettings}</h5>
                    <Card style={{ height: `230px`, width: `400px`, margin: 0, padding: 0}}>
                        <CardContent style={{ height: `230px`, width: `400px`, margin: 0, padding: 0 }}>
                            <div name='secondaryColorDiv' id='secondaryColorDiv' style={{ height: `30px`, width: `400px`, background: secondaryColor, color: '#FFFFFF', padding: 5 }}> DMS</div>
                            <div name='primaryColorDiv' id='primaryColorDiv' style={{ height: `200px`, width: `400px`, background: '#FFFFFF', color: primaryColor, padding: 5 }}>{strings.colorText}</div>
                        </CardContent>
                    </Card>
                    <ColorPicker
                        label={strings.colorPrimary}
                        name='primaryColor'
                        defaultValue={primaryColor}
                        onChange={color => this.setPrimaryColor(color)}
                        style={{ marginRight: 80 }}
                    />
                    <ColorPicker
                        label={strings.colorSecondary}
                        name='secondaryColor'
                        defaultValue={secondaryColor}
                        onChange={color => this.setSecondaryColor(color)}
                    />
                    <br/>
                    <Button type="submit" onClick={this.handleSubmit} variant="contained" style={{ marginTop: 10 }}> {strings.colorSave} </Button>
                </CardContent>               
            </Card >
        )
    }
};
