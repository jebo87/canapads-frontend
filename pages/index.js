import '../styles/styles.scss';
import 'normalize-scss/sass/_normalize.scss';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { connect, useDispatch, useSelector } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { setSelectedListing } from './../redux/actions/selectedListingActions';
import { setListings } from './../redux/actions/listingsActions';
import { setPageSelected, setPages, setPagesVisible } from './../redux/actions/paginationActions';
import { setFilters } from './../redux/actions/filterActions';
import { initStore } from '../redux/store';
import { Listings } from '../components/listings/Listings';
import Filter from '../components/Filters';
import { getAds } from '../backend_interface/api_if';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Pagination from '../components/pagination/Pagination';

// const MapNoSSR = dynamic(() => import('../components/Map/MkMap'), {
// 	ssr: false
// });
const MapCanapadsNoSSR = dynamic(() => import('../components/map/MapCanapads'), {
	ssr: false
});

const defaultSize = 20;
const defaultFrom = 0;
const defaultPriceLow = 0;
const defaultPriceHigh = 1000000;

const Home = (state) => {
	const dispatch = useDispatch();

	//const [ listings, setListings ] = useState(props.listings);
	const [ showFilters, setShowFilters ] = useState(false);
	//const [ count, setCount ] = useState(props.count);
	const [ searchTerm, setSearchTerm ] = useState('');
	const pagination = useSelector((state) => state.pagination);
	console.log(pagination);
	//console.log(props);
	//console.log(props);
	const updateFilter = (newFilter) => {
		setFilter(newFilter);
	};

	useEffect(
		() => {
			//updatePages(count);
			search(state.filter);
			//console.log(props.filter);
		},
		[ state.count, state.filter ]
	);

	const toggleFilter = async () => {
		await setShowFilters(!showFilters);
	};
	const search = async (search_filter) => {
		const terms = search_filter.searchParam === undefined ? '' : search_filter.searchParam.value;
		// let new_filters = {};
		// new_filters = Object.assign(search_filter, new_filters);
		// if (new_filters.size === undefined) {
		// 	new_filters.size.value = defaultSize;
		// }

		// if (new_filters.from === undefined) {
		// 	new_filters.from.value = defaultFrom;
		// }

		const listings = await getAds(search_filter);
		const newListings = listings;

		dispatch(setListings(newListings));
		// const pages_array = [];
		// const pages = Math.ceil(listings.count / defaultSize);
		// var i;
		// for (i = 0; i < pages; i++) {
		// 	pages_array[i] = i + 1;
		// }

		// dispatch(setPageSelected({ selectedPage: 1 }));
		// dispatch(setPages({ pages: pages_array }));
		// dispatch(setPagesVisible({ pagesVisible: pages_array.slice(0, 5) }));
		//setSelectedPage((search_filter.from.value + search_filter.size.value) / search_filter.size.value);
		//setCount(newListings.count);
		if (terms != '') {
			//lo ideal seria tener un map en el cual tengamos todos los filtros a aplicar en la URL y tener una funcion que
			//se encargue de ponerlos en la barra de acuerdo a lo que seleccione el usuario
			Router.push(`/?search_term=${terms}`, `/?search_term=${terms}`, { shallow: true });
		} else {
			Router.push(`/`, `/`, { shallow: true });
		}
	};

	return (
		<React.Fragment>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
				<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
			</Head>

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
							<Filter
								updateFilter={updateFilter}
								toggleFilter={toggleFilter}
								search={search}
								searchParam={searchTerm}
								filter={filter}
							/>
						</div>
					)}

					<MapCanapadsNoSSR lat={45.527065} lon={-73.653534} data={state.listings} />
				</div>
			</div>
		</React.Fragment>
	);
};
Home.getInitialProps = async function({ store, isServer, pathname, query }) {
	let id = query['listing'];
	// if (id === undefined) {
	// 	id = null;
	// }
	console.log('ejecutando getInitialProps');
	console.log(id);
	store.dispatch(setSelectedListing({ listing: id }));
	const searchTerm = query['search_term'] === undefined ? '' : query['search_term'];
	var filters = {
		searchParam: {
			value: searchTerm
		},
		from: {
			value: defaultFrom
		},
		size: {
			value: defaultSize
		},
		price_low: {
			value: defaultPriceLow
		},
		price_high: {
			value: defaultPriceHigh
		}
	};
	const loadAds = async () => {
		console.log('loading ads');

		const listings = await getAds(filters);

		return listings;
	};
	const listings = await loadAds();
	const pages_array = [];
	const pages = Math.ceil(listings.count / defaultSize);
	var i;
	for (i = 0; i < pages; i++) {
		pages_array[i] = i + 1;
	}
	store.dispatch(setListings(listings));
	store.dispatch(setPageSelected({ selectedPage: 1 }));
	store.dispatch(setPages({ pages: pages_array }));
	store.dispatch(setPagesVisible({ pagesVisible: pages_array.slice(0, 5) }));
	if (typeof window === 'undefined') {
		console.log('NO SE EST[A EJECUTANDO');

		let ads = await loadAds();
		//console.log(ads);
		//const listingCount = async () => await getCount();
		//store.dispatch(setFilters(filters));
		store.dispatch(setListings(listings));
		store.dispatch(setPageSelected({ selectedPage: 1 }));
		store.dispatch(setPages({ pages: pages_array }));
		store.dispatch(setPagesVisible({ pagesVisible: pages_array.slice(0, 5) }));
		return { listing: id, count: ads.count, ads: ads, filter: filters };
	}

	return { listing: id, count: listings.count, listings: listings, filter: filters };
};

const mapStateToProps = (state, props) => {
	return {
		filter: state.filters,
		listings: state.listings
	};
};
export default connect(mapStateToProps)(Home);
//export default connect((state) => state)(Home);
//export default Home;
