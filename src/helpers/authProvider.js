import dataProvider from './dataProvider.js';

const authProvider = {
    login: ({ username, password }) => {
    },
    logout: async () => {
        const language = localStorage.getItem('language');
        await dataProvider.postData('authenticate/Logout')
        localStorage.clear();
        localStorage.setItem('language', language);
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            //const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
            const { id, avatar } = JSON.parse(localStorage.getItem('auth'));
            const fullName = localStorage.getItem('userName');
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    checkAuth: () => (localStorage.getItem('auth') ? Promise.resolve() : Promise.reject({ message: ""})),

    getPermissions: (params) => {
        const role = localStorage.getItem('permissions');
        if (role != null){
            if (role.includes(params))
                return Promise.resolve(true)
            else
                return Promise.reject()
        }
        else
            return Promise.reject()
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
};

export default authProvider;