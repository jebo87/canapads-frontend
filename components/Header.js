import React, { useState, useEffect, useLayoutEffect } from 'react';
import Oidc, { WebStorageStateStore } from 'oidc-client';
import authConfig from '../backend_interface/auth_config';
import dynamic from 'next/dynamic';
const LoginLogoutButtonNoSSR = dynamic(() => import('./LoginLogoutButton'), { ssr: false });
const Header = () => {


    return (
        <div className="header">
            <div className="header_logo"></div>
            <div className="header_title">
                <a href="https://www.canapads.ca/"> CANAPADS</a>
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
            <LoginLogoutButtonNoSSR />


        </div>
    );

};
export default Header;