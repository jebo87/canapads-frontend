import React from 'react';
import AdRows from '../components/panel/AdRows';
import 'normalize-scss/sass/_normalize.scss';
import '../styles/styles.scss';
import logo from '../images/logo.svg';
import heart from '../images/icons8-heart_outline.png';
import home from '../images/icons8-home.png';
import default_avatar from '../images/icons8-user_male_circle_filled.png';

const DashboardPage = () => {
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
				<div className="name">Jane Smith</div>
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
