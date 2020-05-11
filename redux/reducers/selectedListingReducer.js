const selectedListingReducerInitialState = {
	listing: undefined
};

const selectedListingReducer = (state = selectedListingReducerInitialState, action) => {
	switch (action.type) {
		case 'SET_SELECTED':
			return {
				...state,
				...action.global_state
			};

		case 'CLEAR_SELECTED':
			return {};

		default:
			return state;
	}
};

export default selectedListingReducer;
