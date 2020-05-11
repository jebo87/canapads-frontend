const listingDetailReducerInitialState = {};

const listingDetailReducer = (state = listingDetailReducerInitialState, action) => {
	switch (action.type) {
		case 'SET_LISTING_DETAIL':
			return {
				...action.listing_detail
			};

		default:
			return state;
	}
};

export default listingDetailReducer;
