import React, { useState, useEffect } from 'react';
import ListingCard from '../components/panel/ListingCard';
import Header from './Header';
import { Link } from 'react-router-dom';
import 'normalize-scss/sass/_normalize.scss';
import '../styles/styles.scss';
import heart from '../images/icons8-heart_outline.png';
import home from '../images/icons8-home.png';
import default_avatar from '../images/icons8-user_male_circle_filled.png';
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
	} else if (user === {}) {
		console.log(user);
		return <div>Loading...</div>;
	} else {
		return (
			<React.Fragment>
				<Header filter={{ searchParam: '' }} />
				<div className="panel">
					<div className="panel_left">
						<div className="avatar">
							<img src={default_avatar} alt="avatar" />
						</div>
						<div className="name">{user && user.name}</div>
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
	}
};

export default DashboardPage;
