import { Component } from 'react';
import strings from '../localization/Localization.js';
import dataProvider from '../helpers/dataProvider.js';
import MyTheme from '../components/common/MyTheme';

export default class Confirm extends Component {
    componentDidMount = async () => {
        
        const confirm = this.props.match.params.confirm
        if (confirm !== undefined) {
            if (confirm.includes('registration')){
                try{
                    var response = await dataProvider.postDataUnauth('authenticate/confirmRegistration', {
                        tmpKey: confirm.split('_')[1],
                        user: confirm.split('_')[2]
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
                catch(err) {
                    sessionStorage.setItem('confirmMessage', strings.unsuccessfulRegistration);
                    setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                    console.log(err);
                    window.location.href = "#/login";
                }
                
            }
            else if (confirm.includes('password')) {
            }
        }
    }
    render() {
        return (
            <div className="initUser" theme={MyTheme}>
                <div>{strings.registrationVerified}</div>
            </div>
        );
    }
}