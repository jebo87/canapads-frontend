import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import selectedListingReducer from './reducers/selectedListingReducer';
import paginationReducer from './reducers/paginationReducer';
import listingsReducer from './reducers/listingsReducer';
import filtersReducer from './reducers/filtersReducer';
const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension');
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

export const initStore = () => {
	return createStore(
		combineReducers({
			global_state: selectedListingReducer,
			pagination: paginationReducer,
			listings: listingsReducer,
			filters: filtersReducer
		}),
		bindMiddleware([ thunkMiddleware ])
	);
};
