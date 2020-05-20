import React, { useState, useEffect } from 'react';
import AdRows from '../components/panel/AdRows';
import 'normalize-scss/sass/_normalize.scss';
import '../styles/styles.scss';
import logo from '../images/logo.svg';
import heart from '../images/icons8-heart_outline.png';
import home from '../images/icons8-home.png';
import default_avatar from '../images/icons8-user_male_circle_filled.png';
import { getLoggedInUser } from '../backend_interface/api_if';
const DashboardPage = () => {
	const getUser = async () => {
		let user = await getLoggedInUser();

		return user;
	};

	const [ user, setUser ] = useState(undefined);
	useEffect(() => {
		getUser().then((currentUser) => setUser(currentUser));
	}, []);

	if (user === null) {
		return <div>Unauthorized</div>;
	}
	if (user === undefined) {
		console.log(user);
		return <div>Loading...</div>;
	}
	return (
		<div className="panel">
			<div className="panel_left">
				<div className="header_title">
					<img src={logo} alt="logo" />

					<a href="https://www.canapads.ca/">CANAPADS</a>
				</div>
				<div className="avatar">
					<img src={default_avatar} alt="avatar" />
				</div>
				<div className="name">{user && user.email}</div>
				<div className="menu">
					<a href="" className="menu_item">
						<img src={heart} alt="favorites" />
						Favorites
					</a>
					<a href="" className="menu_item">
						<img src={home} alt="listings" />
						My Listings
					</a>
				</div>
			</div>
			<div className="panel_right">
				<h1>My Listings</h1>
				<AdRows />
				<AdRows />
				<AdRows />
				<AdRows />
				<AdRows />
				<AdRows />
				<AdRows />
				<AdRows />
			</div>
		</div>
	);
};

export default DashboardPage;
