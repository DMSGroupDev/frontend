import { Component } from 'react';
import strings from '../localization/Localization.js';
import dataProvider from '../helpers/dataProvider.js';

export default class Confirm extends Component {
    componentDidMount = async () => {
        const confirm = this.props.match.params.confirm
        if (confirm !== undefined) {
            if (confirm.includes('registration')){
                try{
                    var response = await dataProvider.postDataUnauth('authenticate/confirmRegistration', {
                        tmpKey: confirm.split('_')[1]
                    })
                    if (response[0] === 200) {
                        sessionStorage.setItem('confirmMessage', strings.confirmRegistration);
                        setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                    } else {
                        sessionStorage.setItem('confirmMessage', strings.unsuccessfulRegistration);
                        setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                        console.log(response[1]);
                    }
                }
                catch(err) {
                    sessionStorage.setItem('confirmMessage', strings.unsuccessfulRegistration);
                    setTimeout(() => sessionStorage.removeItem('confirmMessage'), 2000);
                    console.log(err);
                }
                
            }
            else if (confirm.includes('password')) {
                console.log(confirm.split('_')[1]);
            }
        }
    }
    render() {
        return null;
    }
}