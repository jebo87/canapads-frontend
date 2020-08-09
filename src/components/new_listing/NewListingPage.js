import React, { useState, useEffect } from 'react';
import Header from '../Header';

import { getLoggedInUser } from '../../backend_interface/api_if';
import heart from '../../images/icons8-heart_outline.png';
import home from '../../images/icons8-home.png';
import default_avatar from '../../images/icons8-user_male_circle_filled.png';
const NewListingPage = () => {
	const getUser = async () => {
		let user = await getLoggedInUser();
		return user;
	};
	const [ user, setUser ] = useState({});
	useEffect(() => {
		getUser().then((currentUser) => {
			setUser(currentUser);
		});
	}, []);
	return (
		<React.Fragment>
			<Header />
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
						<h1>New Listing</h1>
					</center>
				</div>
			</div>
		</React.Fragment>
	);
};

export default NewListingPage;
