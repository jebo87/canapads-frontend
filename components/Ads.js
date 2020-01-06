import React, { createContext, useState } from 'react';
import AdBox from './AdBox';
import AdDetail from './AdDetail';

const SelectedAdContext = createContext();
const Ads = (props) => {
	const [ selectedAd, setSelectedAd ] = useState(6);
	const [ adDetailVisibility, setAdDetailVisibility ] = useState(false);

	const updateAd = (ad) => {
		setSelectedAd(ad);
		console.log('selected ad ', ad);
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
				{adDetailVisibility && <AdDetail toggleVisibility={toggleDetailsVisibility} listingId={6} />}
			</SelectedAdContext.Provider>
		</React.Fragment>
	);
};

export { Ads, SelectedAdContext };
