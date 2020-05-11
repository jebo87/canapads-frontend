import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import globalStateReducer from './reducers/globalStateReducer';
import paginationReducer from './reducers/paginationReducer';
import listingsReducer from './reducers/listingsReducer';
import filtersReducer from './reducers/filtersReducer';
import listingDetailReducer from './reducers/listingDetailReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const bindMiddleware = (middleware) => {
// 	if (process.env.NODE_ENV !== 'production') {
// 		const { composeWithDevTools } = require('redux-devtools-extension');
// 		return composeWithDevTools(applyMiddleware(...middleware));
// 	}
// 	return applyMiddleware(...middleware);
// };

export const initStore = () => {
	return createStore(
		combineReducers({
			global_state: globalStateReducer,
			pagination: paginationReducer,
			listings: listingsReducer,
			filters: filtersReducer,
			listing_detail: listingDetailReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);
};
