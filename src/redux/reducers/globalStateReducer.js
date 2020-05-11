const globalStateReducerInitialState = {
	listing: undefined,
	store_invalid: true
};

const globalStateReducer = (state = globalStateReducerInitialState, action) => {
	switch (action.type) {
		case 'SET_SELECTED':
			return {
				...state,
				...action.global_state
			};
		case 'INVALIDATE_STORE':
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

export default globalStateReducer;
