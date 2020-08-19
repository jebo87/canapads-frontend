import React, { useState, useEffect } from 'react';
import ListingCard from '../components/panel/ListingCard';
import Header from './Header';
import { Link } from 'react-router-dom';
import 'normalize-scss/sass/_normalize.scss';
import '../styles/styles.scss';

import { getLoggedInUser, loadUserListings } from '../backend_interface/api_if';
import LoginLogoutButton from './LoginLogoutButton';

const DashboardPage = () => {
	const getUser = async () => {
		let user = await getLoggedInUser();
		return user;
	};

	const [ userListings, setUserListings ] = useState(undefined);
	const [ user, setUser ] = useState({});
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
		return (
			<div>
				Unauthorized, please login <LoginLogoutButton />
			</div>
		);
	}
	if (user === {}) {
		console.log(user);
		return <div>Loading...</div>;
	}
	return (
		<React.Fragment>
			<Header filter={{ searchParam: '' }} />
			<div className="panel">
				<div className="panel_right">
					<center>
						<h1>My Listings</h1>
					</center>
					<Link to={`/new`} className="blue_button" style={{ width: '15rem', height: '4rem' }}>
						Post a listing
					</Link>
					<ul className="panel_listings">
						{userListings &&
							userListings.ads &&
							userListings.ads.map((listing) => {
								return <ListingCard key={listing.id} listing={listing} />;
							})}
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DashboardPage;
