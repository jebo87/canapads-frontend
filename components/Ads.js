import React from 'react';
import AdBox from './AdBox';
const Ads = (props) => {
	//

	return (
		<React.Fragment>
			<div className="box_ads">
				{props.ads.features &&
					props.ads.features.map((feature) => {
						return <AdBox key={feature.properties.id} feature={feature} />;
					})}
			</div>
		</React.Fragment>
	);
};

export default Ads;
