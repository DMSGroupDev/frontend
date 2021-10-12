import React, { Component } from 'react';
import validator from 'validator';
import strings from '../../localization/Localization.js';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import HelpIcon from "@material-ui/icons/HelpOutline";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ReplayIcon from "@material-ui/icons/Replay";
import ReactTooltip from 'react-tooltip';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import TextField from '@mui/material/TextField';
import MyTheme from '../common/MyTheme.js';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            isValid: false,
            validInfo: "",
            required: false,
            reqStar: "",
            password: "",
            showPassword: false,
        };
        if (this.props.required === true) {
            this.state.required = true;
            this.state.reqStar = "*"
        } else {
            this.state.isValid = true;
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ value: value });
        this.validateField(name, value, this.state.required);
    }

    validateField(fieldName, value, required) {
        let isValid = this.state.isValid;
        let validInfo = this.state.validInfo;

        switch (fieldName) {
            case 'email':
                isValid = validator.isEmail(value);
                validInfo = isValid ? '' : strings.invalidEmail;
                this.setState({
                    isValid: isValid,
                    validInfo: validInfo,
                    reqStar: "*"
                })
                break;
            case 'password':
                isValid = true;
                if (value.length < 8)
                    isValid = false;
                if (!/\d/.test(value))
                    isValid = false;
                if (value.toUpperCase() === value)
                    isValid = false;
                if (value.toLowerCase() === value)
                    isValid = false;
                if (!/[ `!@#$%^&*()_+\-={};':"\\|,.<>/?~]/.test(value))
                    isValid = false;
                validInfo = isValid ? '' : strings.invalidPassword;
                this.setState({
                    isValid: isValid,
                    validInfo: validInfo,
                    reqStar: "*"
                })
                break;
            case 'captcha':
                if (validateCaptcha(value, false)) {
                    isValid = true;
                    validInfo = '';
                    this.setState({
                        isValid: isValid,
                        validInfo: validInfo
                    })
                }
                else {
                    isValid = false;
                    validInfo = strings.invalidCaptcha;
                    this.setState({
                        isValid: isValid,
                        validInfo: validInfo
                    })
                }
                break;
            default:
                if (!required) {
                    isValid = true;
                    validInfo = '';
                    this.setState({
                        isValid: isValid,
                        validInfo: validInfo,
                    })
                } else {
                    isValid = value.length >= 2;
                    validInfo = isValid ? '' : strings.invalidTextValue;
                    this.setState({
                        isValid: isValid,
                        validInfo: validInfo,
                        reqStar: "*"
                    })
                }
                break;
        }
        this.props.onChange(value, validInfo, isValid);
    }

    handleClickReloadCaptcha = (event) => {
        let isValid = this.state.isValid;
        let validInfo = this.state.validInfo;
        loadCaptchaEnginge(6);
        this.setState({
            isValid: false,
            validInfo: strings.invalidCaptcha
        })
        this.props.onChange(validInfo, isValid);
    };

    handleClickShowPassword = (event) => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    componentDidMount() {
        if (this.props.name === 'captcha') {
            loadCaptchaEnginge(6);
            document.getElementById("reload_href").style.display = "none";
        }
    };

    render() {
        const { name, label, type } = this.props;
        
        switch (name) {
            case 'password':
                return (
                    <div className="row inputGroup">
                        <div className="inputPadding"></div>
                        <div>
                            <div className="passInputGroup">
                                <TextField id={name} name={name}
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    type={this.state.showPassword ? "text" : "password"}
                                    required={this.state.required}
                                    className="inputPass width300"
                                    style={{ paddingRight: 0 }}
                                    variant="outlined"
                                    label={label}
                                    theme={MyTheme}
                                />
                                <div className="inputPadding">
                                    <span className="infoToolTip" data-tip={strings.passwordInfo}>
                                        <HelpIcon />
                                        <ReactTooltip type="light" border borderColor="lightgray" textColor="gray" />
                                    </span>
                                    <div className="passVisible">
                                        <IconButton
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            <div className="text-danger inputValidate">{this.state.validInfo} </div>
                        </div>
                    </div>);
            case 'captcha':
                return (
                    <div className="row inputGroup">
                        <div className="inputPadding"></div>
                        <div>                        
                            <TextField id={name} name={name}
                                value={this.state.value}
                                onChange={this.handleChange}
                                type="text"
                                required={true}
                                className="inputCaptcha width300"
                                placeholder={strings.enterCaptcha}
                                variant="outlined"
                                label={label}
                                theme={MyTheme}
                            />
                            <div className="passInputCaptcha">
                                <LoadCanvasTemplate reloadText={strings.ReloadCaptcha} reloadColor="gray" />
                                <div className="captchaBtn">
                                    <IconButton
                                        onClick={this.handleClickReloadCaptcha}
                                    >
                                        {<ReplayIcon />}
                                    </IconButton>
                                </div>
                            </div>
                            <div className="text-danger inputValidate">{this.state.validInfo} </div>
                        </div>
                        <div className="inputPadding"></div>
                    </div>
                );
            default:
                return (
                    <div className="row inputGroup">
                        <div className="inputPadding"></div>
                        <div>
                            <TextField id={name} name={name}
                                value={this.state.value}
                                onChange={this.handleChange}
                                type={type}
                                required={this.state.required}
                                className="width300"
                                variant="outlined"
                                label={label}
                                theme={MyTheme}
                            />
                            <div className="text-danger inputValidate">{this.state.validInfo} </div>
                        </div>
                        <div className="inputPadding"></div>
                    </div>
                );
        }
    }
}