import React, { useState, useEffect, useLayoutEffect } from 'react';
import Oidc, { WebStorageStateStore } from 'oidc-client';
import authConfig from '../backend_interface/auth_config';
import dynamic from 'next/dynamic';
import { getLoggedInUser } from '../backend_interface/api_if';
import logo from '../images/logo.svg';

const LoginLogoutButtonNoSSR = dynamic(() => import('./LoginLogoutButton'), { ssr: false });
const Header = () => {
	const [ username, setUsername ] = useState(null);
	useEffect(() => {
		getLoggedInUser().then((data) => setUsername(data));
	}, []);

	return (
		<div className="header">
			<div className="header_logo" />
			<div className="header_title">
				<img src={logo} alt="logo" />

				<a href="https://www.canapads.ca/"> CANAPADS</a>
			</div>
			<div className="menu">
				<ul>
					<li>
						{' '}
						<a className="active" href="">
							listings
						</a>{' '}
					</li>

					<li>
						{' '}
						<a href="">messages</a>{' '}
					</li>
					<li>
						{' '}
						<a href="">dashboard</a>{' '}
					</li>
				</ul>
			</div>
			<div className="search_area">
				<input placeholder="Search..." type="text" className="search_box" />
			</div>
			<LoginLogoutButtonNoSSR />
			<div className="header_name">
				<img src="" alt="" />
				{username && username.name}
			</div>
		</div>
	);
};
export default Header;
