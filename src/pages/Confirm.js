import { Component } from 'react';
import strings from '../localization/Localization.js';
import dataProvider from '../helpers/dataProvider.js';
import MyTheme from '../components/common/MyTheme';

export default class Confirm extends Component {
    componentDidMount = async () => {

        const confirm = this.props.match.params.confirm
        if (confirm !== undefined) {
            if (confirm.includes('registration')) {
                try {
                    var response = await dataProvider.postDataUnauth('identity/ConfirmEmail', {
                        userId: confirm.split('_')[1],
                        code: confirm.split('_')[2]
                    })
                    if (response[0] === 200) {
                        sessionStorage.setItem('confirmMessage', strings.confirmRegistration);
                        setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                        window.location.href = "#/login";
                    } else {
                        sessionStorage.setItem('confirmMessage', strings.unsuccessfulRegistration);
                        setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                        console.log(response[1]);
                        window.location.href = "#/login";
                    }
                }
                catch (err) {
                    sessionStorage.setItem('confirmMessage', strings.unsuccessfulRegistration);
                    setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                    console.log(err);
                    window.location.href = "#/login";
                }
            }
            else if (confirm.includes('password')) {
                try {
                    var responsePass = await dataProvider.postDataUnauth('identity/ValidateForgetPassword', {
                        userId: confirm.split('_')[1],
                        code: (confirm.split('_')[2] + "_" + confirm.split('_')[3])
                    })
                    if (responsePass[0] === 200) {
                        sessionStorage.setItem('confirmMessage', strings.confirmPassword);
                        setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                        window.location.href = "#/forgottenPassword";
                    } else {
                        sessionStorage.setItem('confirmMessage', strings.unsuccessResetPassword);
                        setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                        console.log(responsePass[1]);
                        window.location.href = "#/login";
                    }
                }
                catch (err) {
                    sessionStorage.setItem('confirmMessage', strings.unsuccessResetPassword);
                    setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                    console.log(err);
                    window.location.href = "#/login";
                }
            }
        }
    }
    render() {
        return (
            <div className="initUser" theme={MyTheme}>
                <div>{strings.verified}</div>
            </div>
        );
    }
}