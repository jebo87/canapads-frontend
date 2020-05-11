import React, { useEffect, createContext, useState, useRef } from 'react';

import { getAds } from '../../backend_interface/api_if';
import filter from '../../images/filters/icons8-filter.png';
import loadingImage from '../../images/loading.gif';
import { useSelector, shallowEqual } from 'react-redux';

import ListingSmall from './ListingSmall';
import ListingDetail from './ListingDetail';

const SelectedListingContext = createContext();
const useListings = () => {
	return useSelector((state) => state.listings);
};

const Listings = (props) => {
	const [ selectedAd, setSelectedAd ] = useState(props.listing);
	let listingSelected = useSelector((state) => state.global_state.listing);
	const [ adDetailVisibility, setAdDetailVisibility ] = useState(listingSelected === undefined ? false : true);
	const [ count, setCount ] = useState(props.count);
	const listingList = useListings();
	const updateAd = (ad) => {
		setSelectedAd(ad);

		setAdDetailVisibility(true);
	};
	let resultsRef = useRef();

	useEffect(
		() => {
			//resultsRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
		},
		[ props.ads ]
	);
	useEffect(
		() => {
			//resultsRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
			if (listingSelected != undefined) {
				setAdDetailVisibility(true);
			}
		},
		[ listingSelected ]
	);

	const toggleDetailsVisibility = () => {
		if (adDetailVisibility) {
			//clear the searchbar
			history.pushState({ empty: 1 }, '', '/');
		}
		setAdDetailVisibility(!adDetailVisibility);
	};

	return (
		<React.Fragment>
			<div ref={resultsRef} className="listings">
				<div className="results_text">
					Your search returned {props.count} results:
					<button className="filter_button" onClick={props.toggleFilter}>
						<img src={filter} alt="" />
					</button>
				</div>
				{!listingList && (
					<div className="loading_box">
						<div className="loading">
							<img src={loadingImage} alt="" />
						</div>
					</div>
				)}

				{listingList && (
					<div className="listing_results">
						{listingList.features &&
							listingList.features.map((feature) => {
								return (
									<ListingSmall
										setSelectedAd={updateAd}
										key={feature.properties.id}
										feature={feature}
									/>
								);
							})}
					</div>
				)}
			</div>
			{
				//adDetailVisibility && <AdDetail toggleVisibility={toggleDetailsVisibility} listingId={6} />
			}
			{listingSelected != undefined && <ListingDetail toggleVisibility={toggleDetailsVisibility} />}
		</React.Fragment>
	);
};

export { Listings };
