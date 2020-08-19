import React, { useEffect, useState, shallowEqual } from 'react';
import filter from '../../images/filters/icons8-filter.png';
import loadingImage from '../../images/loading.gif';
import { useSelector } from 'react-redux';

import ListingSmall from './ListingSmall';
import ListingDetail from './ListingDetail';

const useListings = () => {
	return useSelector(
		(state) => ({
			listingList: state.listings,
			selectedIdMap: state.global_state.selected_listing,
			listingSelected: state.listing_detail
		}),
		shallowEqual
	);
};

const Listings = (props) => {
	// eslint-disable-next-line
	const [ selectedAd, setSelectedAd ] = useState(props.listing);
	const { listingList, selectedIdMap, listingSelected } = useListings();
	// eslint-disable-next-line
	const [ adDetailVisibility, setAdDetailVisibility ] = useState(listingSelected === undefined ? false : true);
	// eslint-disable-next-line
	const [ count, setCount ] = useState(props.count);
	const updateAd = (ad) => {
		setSelectedAd(ad);

		setAdDetailVisibility(true);
	};

	useEffect(() => {}, [ props.ads ]);
	useEffect(
		() => {
			if (listingSelected !== undefined) {
				setAdDetailVisibility(true);
			}
			if (selectedIdMap !== undefined) {
				//do something to scroll to that view
			}
		},
		[ listingSelected, selectedIdMap ]
	);

	const toggleDetailsVisibility = () => {
		if (adDetailVisibility) {
			//clear the searchbar
			//history.pushState({ empty: 1 }, '', '/');
		}
		setAdDetailVisibility(!adDetailVisibility);
	};

	return (
		<React.Fragment>
			<div className="results_text">
				Your search returned {listingList.count || 0} results:
				<button className="filter_button" onClick={props.toggleFilter}>
					<img src={filter} alt="" />
				</button>
			</div>
			<div className="listings">
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
			{listingSelected.id !== undefined && <ListingDetail toggleVisibility={toggleDetailsVisibility} />}
		</React.Fragment>
	);
};

export { Listings };
