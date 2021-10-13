import React, { Component } from 'react';
import strings from '../../localization/Localization.js';

export default class SwitchLanguage extends Component {
    constructor(props) {
        super(props);
        this.handleSetLanguageEn = this.handleSetLanguageEn.bind(this);
        this.handleSetLanguageCs = this.handleSetLanguageCs.bind(this);
    }

    componentDidMount () {
        const language = localStorage.getItem('language');
        switch (language) {
            case 'en':
                this.handleSetDefaultLanguageEn();
                break
            case 'cs' :
                this.handleSetDefaultLanguageCs();
                break
            default:
                this.handleSetDefaultLanguageEn();
                break
        }
        
    };

    handleSetDefaultLanguageEn () {
        strings.setLanguage('en');
        localStorage.setItem('language', 'en');
        document.getElementById("btn-cs").classList.remove("btn-lng-active")
        document.getElementById("btn-en").classList.add("btn-lng-active")
        this.props.onLanguageChange('en');
    };
    
    handleSetDefaultLanguageCs () {
        strings.setLanguage('cs');
        localStorage.setItem('language', 'cs');
        document.getElementById("btn-en").classList.remove("btn-lng-active")
        document.getElementById("btn-cs").classList.add("btn-lng-active")
        this.props.onLanguageChange('cs');
    };

    handleSetLanguageEn() {
        strings.setLanguage('en');
        localStorage.setItem('language', 'en');
        document.getElementById("btn-cs").classList.remove("btn-lng-active")
        document.getElementById("btn-en").classList.add("btn-lng-active")
        this.props.onLanguageChange('en');
        window.location.reload(false);
    };

    handleSetLanguageCs() {
        strings.setLanguage('cs');
        localStorage.setItem('language', 'cs');
        document.getElementById("btn-en").classList.remove("btn-lng-active")
        document.getElementById("btn-cs").classList.add("btn-lng-active")
        this.props.onLanguageChange('cs');
        window.location.reload(false);
    };
    
    render() {
        return (
            <div className="btn-group" role="group">
                <button id="btn-en" className="btn btn-sm btn-lng" onClick={this.handleSetLanguageEn}> en</button>
                <button id="btn-cs" className="btn btn-sm btn-lng" onClick={this.handleSetLanguageCs}> cs </button>
            </div>
        )
    }
}