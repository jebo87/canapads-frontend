const filtersReducerInitialState = {
	searchParam: {
		value: ''
	},
	from: {
		value: 0
	},
	size: {
		value: 20
	},
	price_low: {
		value: 0
	},
	price_high: {
		value: 1000000
	}
};

const filtersReducer = (state = filtersReducerInitialState, action) => {
	switch (action.type) {
		case 'SET_FILTERS':
			return { ...action.filters };
		default:
			return state;
	}
};

export default filtersReducer;
