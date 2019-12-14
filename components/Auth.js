import React, { useEffect, useState } from 'react';
import Oidc, { WebStorageStateStore } from 'oidc-client';
import authConfig from '../backend_interface/auth_config';

const Auth = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {

        const mgr = new Oidc.UserManager({
            ...authConfig,
            response_mode: 'query',
            userStore: new WebStorageStateStore({ store: window.localStorage })
        });
        // mgr.querySessionStatus()
        //     .then((result) => result.json())
        //     .then(result => console.log(result))
        //     .catch(e => console.log(e));
        mgr.getUser().then(myuser => { setUser(myuser); console.log('user:', myuser) });
        console.log('finishing validation');
        mgr.signinRedirectCallback().then(function (user) {
            console.log('singinRedirectCallback', user);
            localStorage.setItem('makako_token', user.access_token);
            window.location = "https://www.canapads.ca";
        }).catch(function (e) {
            console.error(e);
        });

    }, []);

    return (
        <div >
            Redirecting...
        </div>
    );
};


export default Auth;