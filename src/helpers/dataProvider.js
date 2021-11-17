import axios from 'axios';
import strings from '../localization/Localization.js';
import config from '../config.json';

const dataProvider = {
    log(logType, message){
        const headers = {
            'Authorization':
                'Bearer ' + localStorage.getItem('userToken')
        };
        axios.post(config.API_URL + 'util/Log'
            , {
                logTypeText: logType,
                logType: 13,
                logMessage: message
            }
            , { headers: headers })
    },

    async postData(url, params) {
        try {
            var responseMessage = "";
            var responseStatus = 0;
            const headers = { 'Authorization': 
                'Bearer ' + localStorage.getItem('userToken')
            };
            var response = await axios.post(config.API_URL + url, params, {headers: headers})
            if ((response.data.statusCode < 200 || response.data.statusCode >= 300) && response.data.statusCode !== 400) {
                throw new Error(response.statusText);
            } else {
                responseStatus = response.data.statusCode;
                responseMessage = "";
            }
            return [responseStatus, responseMessage]
        } catch (err) {
            responseStatus = err.response.data.statusCode;
            try {
                err.response.data.errorResponse.errors.forEach(function (error) {
                    if (responseMessage === "") {
                        var val = error.attemptedValue;
                        if (error.propertyName === "password") {
                            val = strings.password
                        }
                        responseMessage = val;
                    } else {
                        responseMessage += ", " + val;
                    }
                    switch (error.errorCode) {
                        case '1':
                            responseMessage += strings.error1_notValid;
                            break;
                        case '2':
                            responseMessage += strings.error2_duplicate;
                            break;
                        case '3':
                            responseMessage += strings.error3_minLenght;
                            break;
                        case '4':
                            responseMessage += strings.error4_notEqual;
                            break;
                        case '5':
                            responseMessage += strings.error5_notFound;
                            break;
                        case '6':
                            responseMessage += strings.error6_lockedOut;
                            break;
                        default:
                            this.log('warning', localStorage.getItem('userName') + error.errorCode + error.errorMessage)
                            responseMessage = strings.error_otherErr;
                    }
                })
            }
            catch(error){
                this.log('warning', localStorage.getItem('userName') + error)
                responseMessage = strings.error_otherErr;
            }
            
        }
        return [responseStatus, responseMessage]
    },

     async checkUser(userName, email) {
        try {
            var isDuplicate = true;
            var idInt = 1;
            while (isDuplicate !== false) {
                var response = await this.postDataUnauth('authenticate/UserValidation', { userName, email })
                if (response[1].toString().includes("UserName")) {
                    isDuplicate = true
                    userName = userName.slice(0, -1) + idInt.toString();
                    idInt += 1;
                } else {
                    isDuplicate = false
                }
            }
            return [response[0], response[1], userName]
        } catch (err) {
            return ['400', strings.otherErr, userName]
        }
    },

    async postDataUnauth(url, params) {
        try {
            var responseMessage = "";
            var responseStatus = 0;
            var responseToken = "";
            var responseUser = "";
            var response = await axios.post(config.API_URL + url, params)
            if ((response.data.statusCode < 200 || response.data.statusCode >= 300) && response.data.statusCode !== 400) {
                throw new Error(response.statusText);
            } else {
                responseStatus = response.data.statusCode;
                responseMessage = "";
                if (url === 'authenticate/Login')
                {
                    responseToken = response.data.token;
                    responseUser = response.data.applicationUser.userName;
                }
            }
            return [responseStatus, responseMessage, responseToken, responseUser]
        } catch (err) {
            responseStatus = err.response.data.statusCode;
            err.response.data.errorResponse.errors.forEach(function (error) {
                if (responseMessage === "") {
                    var val = error.attemptedValue;
                    if (error.propertyName === "password") {
                        val = strings.password
                    }
                    responseMessage = val;
                } else {
                    responseMessage += ", " + val;
                }
                switch (error.errorCode) {
                    case '1':
                        responseMessage += strings.error1_notValid;
                        break;
                    case '2':
                        responseMessage += strings.error2_duplicate;
                        break;
                    case '3':
                        responseMessage += strings.error3_minLenght;
                        break;
                    case '4':
                        responseMessage += strings.error4_notEqual;
                        break;
                    case '5':
                        responseMessage += strings.error5_notFound;
                        break;
                    case '6':
                        responseMessage += strings.error6_lockedOut;
                        break;
                    default:
                        responseMessage = strings.error_otherErr;
                }
            })
        }
        return [responseStatus, responseMessage, responseToken, responseUser]
    }
}

    /*
    getList: (resource, params) => {
        return new Promise((resolve, reject) => {
            myApiClient('https://dmsgroup2.azurewebsites.net/api/', { ...options, headers: requestHeaders })
                .then(response =>
                    response.text().then(text => ({
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers,
                        body: text,
                    }))
                )
                .then(({ status, statusText, headers, body }) => {
                    let json;
                    try {
                        json = JSON.parse(body);
                    } catch (e) {
                        // not json, no big deal
                    }
                    if (status < 200 || status >= 300) {
                        return reject(
                            new HttpError(
                                (json && json.message) || statusText,
                                status,
                                json
                            )
                        );
                    }
                    return resolve({ status, headers, body, json });
                });
        });
    },
    getOne: (resource, params) => Promise,
    getMany: (resource, params) => Promise,
    getManyReference: (resource, params) => Promise,
    create: (resource, params) => Promise,
    update: (resource, params) => Promise,
    updateMany: (resource, params) => Promise,
    delete: (resource, params) => Promise,
    deleteMany: (resource, params) => Promise,*/


export default dataProvider;