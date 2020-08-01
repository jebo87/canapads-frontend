import React, { useState, useEffect } from 'react';
import ListingCard from '../components/panel/ListingCard';
import Header from './Header';

import 'normalize-scss/sass/_normalize.scss';
import '../styles/styles.scss';
import logo from '../images/logo.svg';
import heart from '../images/icons8-heart_outline.png';
import home from '../images/icons8-home.png';
import default_avatar from '../images/icons8-user_male_circle_filled.png';
import { getLoggedInUser, loadUserListings } from '../backend_interface/api_if';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		width: 128rem;
		padding: 1.5rem 0 1.5rem 0;
		.search_area{
			width:30rem;
		}
		
	`;
const DashboardPage = () => {
	const getUser = async () => {
		let user = await getLoggedInUser();
		return user;
	};

	const [ user, setUser ] = useState({});
	const [ userListings, setUserListings ] = useState(undefined);
	useEffect(() => {
		getUser().then((currentUser) => {
			setUser(currentUser);
			if (currentUser !== null && currentUser !== undefined) {
				loadListings(currentUser.sub);
			}
		});
	}, []);

	const loadListings = async (currentUser) => {
		let ul = await loadUserListings(currentUser);
		setUserListings(ul);
	};

	if (user === null || user === undefined) {
		return <div>Unauthorized</div>;
	}
	if (user === {}) {
		console.log(user);
		return <div>Loading...</div>;
	}
	return (
		<React.Fragment>
			<StyledHeader filter={{ searchParam: '' }} />
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
						<button className="menu_item">
							<img src={heart} alt="favorites" />
							Favorites
						</button>
						<button className="menu_item">
							<img src={home} alt="listings" />
							Listings
						</button>
					</div>
				</div>
				<div className="panel_right">
					<h1>My Listings</h1>
					<div className="panel_listings">
						{userListings &&
							userListings.ads.map((listing) => {
								return <ListingCard key={listing.id} listing={listing} />;
							})}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DashboardPage;
