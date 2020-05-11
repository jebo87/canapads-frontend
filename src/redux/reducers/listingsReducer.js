const listingsReducerInitialState = {};

const listingsReducer = (state = listingsReducerInitialState, action) => {
	switch (action.type) {
		case 'SET_LISTINGS':
			return action.listingList;
		default:
			return state;
	}
};

export default listingsReducer;
