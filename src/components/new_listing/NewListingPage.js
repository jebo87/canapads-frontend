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
			<div className="panel">
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
