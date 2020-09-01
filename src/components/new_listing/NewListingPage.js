import React, { useState, useEffect } from 'react';
import Header from '../Header';

import { getLoggedInUser } from '../../backend_interface/api_if';
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
			<main className="new_listing">
				<center>
					<h1>New Listing</h1>
				</center>
				<section />
			</main>
		</React.Fragment>
	);
};

export default NewListingPage;
