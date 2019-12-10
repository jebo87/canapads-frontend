import React, { useEffect } from 'react';
import Oidc from 'oidc-client';
import authConfig from '../backend_interface/auth_config';

const AuthCallback = () => {
    useEffect(() => {
        const mgr = new Oidc.UserManager({ ...authConfig, response_mode: 'query', });
        mgr.signinRedirectCallback().then(function (user) {
            console.log(user);
            sessionStorage.setItem('makako_token', user.access_token);
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

export default AuthCallback;