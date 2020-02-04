import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Ads } from '../components/Ads';
import { getAds, getCount } from '../backend_interface/api_if';
import 'normalize-scss/sass/_normalize.scss';
import '../styles/styles.scss';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
const MapNoSSR = dynamic(() => import('../components/MkMap'), {
	ssr: false
});

const Home = (props) => {
	const [ listings, setListings ] = useState(props.ads);
	const [ selectedPage, setSelectedPage ] = useState(1);

	const pages = Math.round(props.count / 20);
	const pages_array = [];
	var i;
	for (i = 0; i < pages; i++) {
		pages_array[i] = i + 1;
	}

	const [ pagesVisible, setPagesVisible ] = useState(pages_array.slice(0, 5));
	const loadPage = async (page) => {
		const loadedAds = await getAds(page);
		const newListings = loadedAds;
		setSelectedPage(page);
		setListings(newListings);
	};
	const goToFirst = async () => {
		await loadPage(1);
		setPagesVisible(pages_array.slice(0, 5));
	};
	const goToLast = async () => {
		await loadPage(pages_array.length);
		setPagesVisible(pages_array.slice(pages_array.length - 5, pages_array.length));
	};
	const nextPage = async () => {
		if (selectedPage < pages_array.length) {
			await loadPage(selectedPage + 1);
			//dont move the visible array if we are near the end of the page array
			// or if we are in the first two items.
			if (selectedPage < pages_array.length - 2 && selectedPage > 2) {
				console.log(selectedPage - 2, selectedPage + 3);
				setPagesVisible(pages_array.slice(selectedPage - 2, selectedPage + 3));
				//if we are in the last items we should not shrink the visible array
			} else if (selectedPage >= pages_array.length - 2) {
				setPagesVisible(pages_array.slice(pages_array.length - 5, pages_array.length));
			}
		}
	};

	const previousPage = async () => {
		if (selectedPage > 1) {
			await loadPage(selectedPage - 1);
			//we will keep moving back the visible array until we are in page 3
			if (selectedPage - 1 > 2 && selectedPage < pages_array.length - 2) {
				setPagesVisible(pages_array.slice(selectedPage - 4, selectedPage + 1));
			}
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
				<Header />

				<div className="map_search">
					<div className="left_box">
						<Ads ads={listings} listing={props.listing} count={props.count} />
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
										onClick={() => loadPage(page)}
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
					</div>

					<MapNoSSR lat={45.527065} lon={-73.653534} ads={listings} />
				</div>
			</div>
		</div>
	);
};
Home.getInitialProps = async function({ query }) {
	const id = query['listing'];
	const page = query['page'];
	const loadAds = async () => {
		// console.log('loading ads');
		return await getAds(page);
	};
	const adCount = async () => {
		// console.log('loading ad count');
		return await getCount();
	};

	if (typeof window === 'undefined') {
		let ads = await loadAds();
		let ad_count = { ...(await adCount()) };
		return { listing: id, count: ad_count.count, ads: ads };
	}
	return { listing: id, count: 0, ads: {} };
};
export default Home;
