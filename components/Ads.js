import React, { useEffect, createContext, useState } from 'react';
import AdBox from './AdBox';
import AdDetail from './AdDetail';
import ListingDetail from './ListingDetail';

const SelectedAdContext = createContext();
const Ads = (props) => {
	const [ selectedAd, setSelectedAd ] = useState(props.listing);
	const [ adDetailVisibility, setAdDetailVisibility ] = useState(props.listing === undefined ? false : true);

	const updateAd = (ad) => {
		setSelectedAd(ad);

		setAdDetailVisibility(true);
	};

	const toggleDetailsVisibility = () => {
		setAdDetailVisibility(!adDetailVisibility);
	};

	return (
		<React.Fragment>
			<SelectedAdContext.Provider value={{ selectedAd: selectedAd }}>
				<div className="box_ads">
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
