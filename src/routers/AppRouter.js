import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './../components/HomePage';
import ListingPage from './../components/listing_page/ListingPage';
import Auth from './../components/Auth';
import Logout from './../components/Logout';
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={HomePage} exact={true} />
				<Route path="/details/:id" component={ListingPage} />
				<Route path="/auth" component={Auth} />
				<Route path="/logout" component={Logout} />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
