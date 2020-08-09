import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './../components/HomePage';
import ListingPage from './../components/listing_page/ListingPage';
import DashboardPage from './../components/DashboardPage';
import NewListingPage from './../components/new_listing/NewListingPage';
import Auth from './../components/Auth';
import Logout from './../components/Logout';
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={HomePage} exact={true} />
				<Route path="/details/:id" component={ListingPage} />
				<Route path="/auth" component={Auth} />
				<Route path="/dashboard" component={DashboardPage} />
				<Route path="/new" component={NewListingPage} />
				<Route path="/logout" component={Logout} />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
