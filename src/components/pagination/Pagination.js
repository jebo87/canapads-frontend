import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setPagesVisible, setPageSelected } from './../../redux/actions/paginationActions';
import { setFilters } from './../../redux/actions/filterActions';

const usePagination = () => {
	return useSelector(
		(state) => ({
			selectedPage: state.pagination.selectedPage,
			pages: state.pagination.pages,
			pagesVisible: state.pagination.pagesVisible,
			filter: state.filters
		}),
		shallowEqual
	);
};
const Pagination = (props) => {
	const dispatch = useDispatch();

	const { selectedPage, pages, pagesVisible, filter } = usePagination();
	//console.log(pagesVisible);
	const [ paginationDirection, setPaginationDirection ] = useState('');
	useEffect(
		() => {
			updatePagination(paginationDirection);
		},
		// eslint-disable-next-line
		[ selectedPage, paginationDirection ]
	);
	const updatePagination = (direction) => {
		if (direction === 'right') {
			if (selectedPage <= pages.length) {
				//dont move the visible array if we are near the end of the page array
				// or if we are in the first three items.
				if (pages.length > 5) {
					if (selectedPage < pages.length - 2 && selectedPage > 3) {
						dispatch(setPagesVisible({ pagesVisible: pages.slice(selectedPage - 3, selectedPage + 2) }));
						//if we are in the last items we should not shrink the visible array
					} else if (selectedPage >= pages.length - 2) {
						dispatch(setPagesVisible({ pagesVisible: pages.slice(pages.length - 5, pages.length) }));
					}
				}
			}
		} else {
			if (selectedPage > 1) {
				//we will keep moving back the visible array until we are in page 3
				if (selectedPage - 1 >= 2 && selectedPage < pages.length - 2) {
					dispatch(setPagesVisible({ pagesVisible: pages.slice(selectedPage - 3, selectedPage + 2) }));
				} else if (selectedPage >= pages.length - 2) {
					dispatch(setPagesVisible({ pagesVisible: pages.slice(pages.length - 5, pages.length) }));
				}
			} else {
				dispatch(setPagesVisible({ pagesVisible: pages.slice(selectedPage - 1, selectedPage + 4) }));
			}
		}
	};
	const loadPage = async (old, page) => {
		//setListings({});
		var filters = {
			...filter,
			from: { value: page * filter.size.value - filter.size.value }
		};
		// setFilter(filters);

		dispatch(setFilters(filters));
		dispatch(setPageSelected({ selectedPage: page }));
		setPaginationDirection(page - old > 0 ? 'right' : 'left');
	};
	const goToFirst = async () => {
		loadPage(2, 1);
	};
	const goToLast = async () => {
		loadPage(1, pages.length);
	};
	const nextPage = async () => {
		if (selectedPage < pages.length) {
			loadPage(selectedPage, selectedPage + 1);
		}
	};

	const previousPage = async () => {
		if (selectedPage > 1) {
			loadPage(selectedPage, selectedPage - 1);
		}
	};
	return (
		<div className="pagination">
			<button className="page" onClick={goToFirst}>
				|&#60;
			</button>
			<button className="page text_button" onClick={previousPage}>
				Prev
			</button>

			{pagesVisible &&
				pagesVisible.map((page, index) => {
					return (
						<button
							className={selectedPage === page ? 'page selected' : 'page'}
							key={index}
							onClick={() => loadPage(selectedPage, page)}
						>
							{page}
						</button>
					);
				})}
			<button className="page text_button" onClick={nextPage}>
				Next
			</button>
			<button className="page" onClick={goToLast}>
				&#62;|
			</button>
		</div>
	);
};
// const mapStateToProps = (state, props) => {
// 	return {
// 		selectedPage: state.selectedPage,
// 		paginationDirection: state.paginationDirection,
// 		pages: state.pages,
// 		pagesVisible: state.pagesVisible
// 	};
// };
// export default connect(mapStateToProps)(Pagination);
export default Pagination;
