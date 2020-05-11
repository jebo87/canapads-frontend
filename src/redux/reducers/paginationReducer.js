const paginationReducerInitialState = {
	selectedPage: 1,
	paginationDirection: '',
	pages: [],
	pagesVisible: []
};

const paginationReducer = (state = paginationReducerInitialState, action) => {
	switch (action.type) {
		case 'SET_SELECTED_PAGE':
			return {
				...state,
				...action.selectedPage
			};
		case 'SET_PAGES':
			return {
				...state,
				...action.pages
			};
		case 'SET_PAGES_VISIBLE':
			return {
				...state,
				...action.pagesVisible
			};
		default:
			return state;
	}
};

export default paginationReducer;
