import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Ads } from '../components/Ads';
import Filter from '../components/Filters';
import { getAds } from '../backend_interface/api_if';
import 'normalize-scss/sass/_normalize.scss';
import '../styles/styles.scss';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
const MapNoSSR = dynamic(() => import('../components/MkMap'), {
	ssr: false
});

const defaultSize = 20;
const defaultFrom = 0;
const defaultPriceLow = 0;
const defaultPriceHigh = 1000000;

const Home = (props) => {
	const [ listings, setListings ] = useState(props.ads);
	const [ selectedPage, setSelectedPage ] = useState(1);
	const [ paginationDirection, setPaginationDirection ] = useState('');
	const [ showFilters, setShowFilters ] = useState(false);
	const [ count, setCount ] = useState(props.count);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ filter, setFilter ] = useState(props.filter);
	const [ pages, setPages ] = useState([]);
	const [ pagesVisible, setPagesVisible ] = useState([]);

	const updateFilter = (newFilter) => {
		console.log('entro a updatefilter');
		console.log(newFilter);
		setFilter(newFilter);
	};

	useEffect(
		() => {
			updatePages(count);
			search(filter);
		},
		[ count, filter ]
	);
	useEffect(
		() => {
			updatePagination(paginationDirection);
		},
		[ selectedPage ]
	);

	const updatePagination = (direction) => {
		if (direction === 'right') {
			if (selectedPage <= pages.length) {
				//dont move the visible array if we are near the end of the page array
				// or if we are in the first three items.
				if (pages.length > 5) {
					if (selectedPage < pages.length - 2 && selectedPage > 3) {
						setPagesVisible(pages.slice(selectedPage - 3, selectedPage + 2));
						//if we are in the last items we should not shrink the visible array
					} else if (selectedPage >= pages.length - 2) {
						setPagesVisible(pages.slice(pages.length - 5, pages.length));
					}
				}
			}
		} else {
			if (selectedPage > 1) {
				//we will keep moving back the visible array until we are in page 3
				if (selectedPage - 1 > 2 && selectedPage < pages.length - 2) {
					setPagesVisible(pages.slice(selectedPage - 3, selectedPage + 2));
				} else if (selectedPage >= pages.length - 2) {
					setPagesVisible(pages.slice(pages.length - 5, pages.length));
				}
			}
		}
	};

	const updatePages = async (newCount) => {
		const pages_array = [];
		const pages = Math.ceil(newCount / filter.size.value);
		for (i = 0; i < pages; i++) {
			pages_array[i] = i + 1;
		}
		setPages(pages_array);
		setPagesVisible(pages_array.slice(0, 5));
	};

	var i;

	const toggleFilter = async () => {
		await setShowFilters(!showFilters);
	};
	const search = async (search_filter) => {
		const terms = search_filter.searchParam === undefined ? '' : search_filter.searchParam.value;
		if (search_filter.size === undefined) {
			search_filter.size.value = defaultSize;
		}

		if (search_filter.from === undefined) {
			search_filter.from.value = defaultFrom;
		}

		const loadedAds = await getAds(search_filter);
		const newListings = loadedAds;

		setListings(newListings);
		setSelectedPage((search_filter.from.value + search_filter.size.value) / search_filter.size.value);
		setCount(newListings.count);
		if (terms != '') {
			//lo ideal seria tener un map en el cual tengamos todos los filtros a aplicar en la URL y tener una funcion que
			//se encargue de ponerlos en la barra de acuerdo a lo que seleccione el usuario
			Router.push(`/?search_term=${terms}`, `/?search_term=${terms}`, { shallow: false });
		} else {
			Router.push(`/`, `/`, { shallow: false });
		}
	};
	const loadPage = async (old, page) => {
		var filters = {
			...filter,
			from: { value: page * filter.size.value - filter.size.value }
		};
		setFilter(filters);
		setSelectedPage(page);
		setPaginationDirection(page - old > 0 ? 'right' : 'left');

		// const loadedAds = await getAds(filters);
		// const newListings = loadedAds;
		// setSelectedPage(page);
		// setListings(newListings);
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
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
				<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
			</Head>

			<div className="home_page">
				<Header updateFilter={updateFilter} filter={filter} />

				<div className="map_search">
					<div className="left_box">
						{!showFilters && (
							<Ads ads={listings} listing={props.listing} count={count} toggleFilter={toggleFilter} />
						)}
						{showFilters && (
							<Filter
								updateFilter={updateFilter}
								toggleFilter={toggleFilter}
								search={search}
								searchParam={searchTerm}
								filter={filter}
							/>
						)}
						{!showFilters && (
							<div className="pagination">
								<button className="page" onClick={goToFirst}>
									|&#60;
								</button>
								<button className="page text_button" onClick={previousPage}>
									Prev
								</button>

								{pagesVisible.map((page, index) => {
									return (
										<button
											className={selectedPage == page ? 'page selected' : 'page'}
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
						)}
					</div>

					<MapNoSSR lat={45.527065} lon={-73.653534} ads={listings} />
				</div>
			</div>
		</div>
	);
};
Home.getInitialProps = async function({ query }) {
	const id = query['listing'];
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
		// console.log('loading ads');

		return await getAds(filters);
	};
	if (typeof window === 'undefined') {
		let ads = await loadAds();
		console.log(ads);
		//const listingCount = async () => await getCount();
		return { listing: id, count: ads.count, ads: ads, filter: filters };
	}
	return { listing: id, count: 0, ads: {}, filter: filters };
};
export default Home;
