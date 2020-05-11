import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './../components/HomePage';
import ListingPage from './../components/listing_page/ListingPage';
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={HomePage} exact={true} />
				<Route path="/details/:id" component={ListingPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
