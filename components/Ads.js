import React, { useEffect, createContext, useState, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { getAds } from '../backend_interface/api_if';
import filter from '../images/icons8-filter.png';

import AdBox from './AdBox';
import ListingDetail from './ListingDetail';

const SelectedAdContext = createContext();
const Ads = (props) => {
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
			resultsRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
		},
		[ props.ads ]
	);

	const toggleDetailsVisibility = () => {
		if (adDetailVisibility) {
			//clear the searchbar
			history.pushState({ hola: 1 }, '', '/');
		}
		setAdDetailVisibility(!adDetailVisibility);
	};

	return (
		<React.Fragment>
			<SelectedAdContext.Provider value={{ selectedAd: selectedAd }}>
				<div ref={resultsRef} className="box_ads">
					<div className="results">
						Your search returned {props.count} results:{' '}
						<button className="filter_button" onClick={props.toggleFilter}>
							<img src={filter} alt="" />
						</button>
					</div>
					{props.ads.features &&
						props.ads.features.map((feature) => {
							return <AdBox setSelectedAd={updateAd} key={feature.properties.id} feature={feature} />;
						})}
				</div>
				{
					//adDetailVisibility && <AdDetail toggleVisibility={toggleDetailsVisibility} listingId={6} />
				}
				{adDetailVisibility && <ListingDetail toggleVisibility={toggleDetailsVisibility} />}
			</SelectedAdContext.Provider>
		</React.Fragment>
	);
};

export { Ads, SelectedAdContext };
