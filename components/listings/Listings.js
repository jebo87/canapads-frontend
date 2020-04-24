import React, { useEffect, createContext, useState, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { getAds } from '../../backend_interface/api_if';
import filter from '../../images/filters/icons8-filter.png';
import loadingImage from '../../images/loading.gif';

import ListingSmall from './ListingSmall';
import ListingDetail from './ListingDetail';

const SelectedListingContext = createContext();
const Listings = (props) => {
	const [ selectedAd, setSelectedAd ] = useState(props.listing);
	const [ adDetailVisibility, setAdDetailVisibility ] = useState(props.listing === undefined ? false : true);
	const [ count, setCount ] = useState(props.count);

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

	const toggleDetailsVisibility = () => {
		if (adDetailVisibility) {
			//clear the searchbar
			history.pushState({ empty: 1 }, '', '/');
		}
		setAdDetailVisibility(!adDetailVisibility);
	};

	return (
		<React.Fragment>
			<SelectedListingContext.Provider value={{ selectedAd: selectedAd }}>
				<div ref={resultsRef} className="listings">
					<div className="results_text">
						Your search returned {props.count} results:
						<button className="filter_button" onClick={props.toggleFilter}>
							<img src={filter} alt="" />
						</button>
					</div>
					{!props.ads.features && (
						<div className="loading_box">
							<div className="loading">
								<img src={loadingImage} alt="" />
							</div>
						</div>
					)}
					<div className="listing_results">
						{props.ads.features &&
							props.ads.features.map((feature) => {
								return (
									<ListingSmall
										setSelectedAd={updateAd}
										key={feature.properties.id}
										feature={feature}
									/>
								);
							})}
					</div>
				</div>
				{
					//adDetailVisibility && <AdDetail toggleVisibility={toggleDetailsVisibility} listingId={6} />
				}
				{adDetailVisibility && <ListingDetail toggleVisibility={toggleDetailsVisibility} />}
			</SelectedListingContext.Provider>
		</React.Fragment>
	);
};

export { Listings, SelectedListingContext };
