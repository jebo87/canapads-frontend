import React, { useState, useEffect } from 'react';
import Oidc, { WebStorageStateStore } from 'oidc-client';
import authConfig from '../backend_interface/auth_config';
import icon_login from './../images/menu/icons8-login.png';
import icon_logout from './../images/menu/icons8-logout.png';

const LoginLogoutButton = (props) => {
	const [ config ] = useState(authConfig);
	const [ user, setUser ] = useState(null);
	const [ manager, setManager ] = useState(null);
	const login = () => {
		console.log('starting logging');

		//if user is already logged in, redirect to home page
		var tempUser = localStorage.getItem(`oidc.user:${config.authority}:${config.client_id}`);
		if (tempUser) {
			window.location = 'https://www.canapads.ca';
		} else {
			//user is not logged in. Initiate login process
			manager.signinRedirect();
		}
	};
	const logout = () => {
		//Verify the user has not logged out before from another tab
		var tempUser = localStorage.getItem(`oidc.user:${config.authority}:${config.client_id}`);
		if (!tempUser) {
			window.location = 'https://www.canapads.ca';
		} else {
			//if not, initiate logout process
			sessionStorage.removeItem('makako_token');
			manager.signoutRedirect();
		}
	};

	useEffect(
		() => {
			const mgr = new Oidc.UserManager({
				...config,
				userStore: new WebStorageStateStore({ store: window.localStorage })
			});
			setManager(mgr);

			mgr.getUser().then((user) => {
				if (user && !user.expired) {
					setUser(user);
				} else {
					setUser(null);
					localStorage.removeItem('makako_token');
					localStorage.removeItem(`oidc.user:${config.authority}:${config.client_id}`);
					console.log('User not logged in');
				}
			});

			mgr.events.addAccessTokenExpiring(function() {
				console.log('token expiring...');
			});
			mgr.events.addAccessTokenExpired(function() {
				console.log('token expired');
				//TODO: implement logic for silent renew

				// localStorage.removeItem('makako_token');
				// localStorage.removeItem(`oidc.user:${config.authority}:${config.client_id}`);
				// window.location = 'https://www.canapads.ca';
			});
		},
		[ config ]
	);

	return (
		<React.Fragment>
			{props.type === 'login' ? (
				<button onClick={login} className="side_nav_link">
					<img src={icon_login} alt="" />
					Login
				</button>
			) : (
				<button className="side_nav_link" onClick={logout}>
					<img src={icon_logout} alt="" />
					Logout
				</button>
			)}
		</React.Fragment>
	);
};

export default LoginLogoutButton;
