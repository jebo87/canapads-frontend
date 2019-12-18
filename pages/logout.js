import React, { useEffect } from 'react';
import Oidc, { WebStorageStateStore } from 'oidc-client';
import authConfig from '../backend_interface/auth_config';

const LogoutCallback = () => {
    useEffect(() => {
        const mgr = new Oidc.UserManager({
            ...authConfig,
            response_mode: 'query',
            userStore: new WebStorageStateStore({ store: window.localStorage })
        });
        mgr.signoutRedirectCallback().then(function (user) {
            console.log('signoutRedirectCallback', user);
            localStorage.removeItem('makako_token');
            window.location = "https://www.canapads.ca";
        }).catch(function (e) {
            console.error(e);
        });
        // console.log("entro al call back de logout");
        // sessionStorage.removeItem('makako_token');
        // window.location = 'https://www.canapads.ca'

    }, []);

    return (
        <div >
            Redirecting...
        </div>
    );
};

export default LogoutCallback;