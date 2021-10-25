const authProvider = {
    login: ({ username, password }) => {
        /*const request = new Request('https://mydomain.com/authenticate', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                localStorage.setItem('token', token);
                localStorage.setItem('permissions', decodedToken.permissions);
            });*/
    },
    logout: () => {
        const language = localStorage.getItem('language');
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
    checkAuth: () => (localStorage.getItem('auth') ? Promise.resolve() : Promise.reject({ message: 'login.required' })),

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