import React, { useState, useEffect, useLayoutEffect } from 'react';
import Oidc from 'oidc-client';
import authConfig from '../backend_interface/auth_config';
const Header = () => {
    const [config, setConfig] = useState(authConfig);
    const [user, setUser] = useState(null);
    const [manager, setManager] = useState(null)
    const login = () => {
        console.log('starting logging');
        manager.signinRedirect();
    };
    const logout = () => {
        manager.signoutRedirect();
    };

    useEffect(() => {
        const mgr = new Oidc.UserManager(config)
        setManager(mgr);
        //mgr.querySessionStatus().then((result) => result.json()).then(result => console.log(result));
        mgr.getUser().then((user) => {

            if (user && !user.expired) {
                setUser(user)
                console.log("User logged in", user.profile);
            } else {
                setUser(null)
                sessionStorage.removeItem('makako_token');
                sessionStorage.removeItem(`oidc.user:${config.authority}:${config.client_id}`)
                console.log("User not logged in");
            }
        });
        mgr.events.addAccessTokenExpiring(function () {
            console.log("token expiring...");
        });
    }, []);

    return (<div className="header">
        <div className="header_logo"></div>
        <div className="header_title">
            CANAPADS
    </div>
        <div className="menu">
            <ul>
                <li>   <a className="active" href="">apartments</a> </li>
                <li>  <a href="">houses</a> </li>
            </ul>
        </div>
        <div className="search_area">
            <input placeholder="Search..." type="text" className="search_box" />
        </div>

        {
            user === null ? <button className="blue_button" onClick={login}>Login</button> : <button className="blue_button" onClick={logout}>logout</button>

        }
    </div>);

};
export default Header;