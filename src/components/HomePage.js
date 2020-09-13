import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
//import withRedux from 'next-redux-wrapper';
import { setListings } from './../redux/actions/listingsActions';
import { setPageSelected, setPages, setPagesVisible } from './../redux/actions/paginationActions';
import { invalidateStore } from './../redux/actions/globalStateActions';
//import { setFilters } from './../redux/actions/filterActions';
//import { initStore } from '../redux/store';
import { Listings } from './listings/Listings';
import Filter from './Filters';
import { defaultParamsMap, defaultSize } from './filters/defaultFilters';
import { getAds } from '../backend_interface/api_if';
import Header from './Header';
import Pagination from './pagination/Pagination';
import MapCanapads from './map/MapCanapads';

const useHomePage = () => {
	return useSelector(
		(state) => ({
			filters: state.filters,
			listings: state.listings,
			storeInvalid: state.global_state.store_invalid
		}),
		shallowEqual
	);
};
const HomePage = (state) => {
	const dispatch = useDispatch();
	const { filters, listings, storeInvalid } = useHomePage();

	const [ showFilters, setShowFilters ] = useState(false);

	// eslint-disable-next-line
	const [ searchTerm, setSearchTerm ] = useState('');

	const initializeListings = async (newFilter) => {
		const filters = { ...defaultParamsMap, ...newFilter };
		const newListings = await getAds(filters);

		updateStore(newListings);
	};

	const loadListings = async (filters) => {
		const newListings = await getAds(filters);
		updateStore(newListings);
	};

	const updateStore = (newListings) => {
		dispatch(setListings(newListings));

		if (storeInvalid) {
			const pages_array = [];
			const pages = Math.ceil(newListings.count / defaultSize);
			var i;
			for (i = 0; i < pages; i++) {
				pages_array[i] = i + 1;
			}

			dispatch(setPages({ pages: pages_array }));
			dispatch(setPagesVisible({ pagesVisible: pages_array.slice(0, 5) }));
			dispatch(setPageSelected({ selectedPage: 1 }));
			dispatch(invalidateStore({ store_invalid: false }));
		}
	};

	useEffect(
		() => {
			if (listings === {}) {
				initializeListings();
			} else {
				loadListings(filters);
			}
		}, // eslint-disable-next-line
		[ filters ]
	);

	const toggleFilter = async () => {
		await setShowFilters(!showFilters);
	};
	// const search = async (search_filter) => {
	// 	const terms = search_filter.searchParam === undefined ? '' : search_filter.searchParam.value;

	// 	const newListings = await getAds(search_filter);

	// 	dispatch(setPageSelected({ selectedPage: 1 }));
	// 	dispatch(invalidateStore({ store_invalid: true })).then(() => {
	// 		updateStore(newListings);
	// 	});

	// 	//setSelectedPage((search_filter.from.value + search_filter.size.value) / search_filter.size.value);
	// 	//setCount(newListings.count);
	// 	if (terms !== '') {
	// 		//lo ideal seria tener un map en el cual tengamos todos los filtros a aplicar en la URL y tener una funcion que
	// 		//se encargue de ponerlos en la barra de acuerdo a lo que seleccione el usuario
	// 		//Router.push(`/?search_term=${terms}`, `/?search_term=${terms}`, { shallow: true });
	// 	} else {
	// 		//Router.push(`/`, `/`, { shallow: true });
	// 	}
	// };

	return (
		<React.Fragment>
			<div className="home_page">
				<Header />

				<div className="map_search">
					{!showFilters && (
						<div className="left_box">
							<Listings
								ads={state.listings}
								listing={state.listing}
								count={state.count}
								toggleFilter={toggleFilter}
							/>
							<Pagination />
						</div>
					)}

					{showFilters && (
						<div className="left_box">
							<Filter toggleFilter={toggleFilter} />
						</div>
					)}
					<MapCanapads lat={45.527065} lon={-73.653534} />
				</div>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
