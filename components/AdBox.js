import React from 'react';
import Link from 'next/link';
import external from '../images/icons8-external_link.png';
const AdBox = (props) => {
	//console.log(props);
	const setSelectedAd = () => {
		props.setSelectedAd(props.feature.properties.id);
	};
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	//const cost = '$' + props.feature.properties.price.toFixed().replace(/\d(?=(\d{3}))/g, '$&,');
	const cost = formatter.format(props.feature.properties.price);
	return (
		<div className="box">
			<div className="price_tag">
				<span className="cost">{cost}</span>
			</div>
			<div className="external">
				<Link href="/details/[id]" as={`/details/${props.feature.properties.id}`}>
					<a target="_blank">
						<img className="external_img" src={external} alt="" />{' '}
					</a>
				</Link>
			</div>
			<Link href={`/?listing=${props.feature.properties.id}`} as={`/?listing=${props.feature.properties.id}`}>
				<a onClick={setSelectedAd}>
					<div className="info_box">
						<div className="info_box_bottom">
							<span className="bedrooms">{props.feature.properties.bedrooms} bedrooms</span>
							<span className="bathrooms">{props.feature.properties.bathrooms} bathrooms</span>
						</div>
					</div>
					<img className="box_image" src={props.feature.properties.image} alt="" />
				</a>
			</Link>
		</div>
	);
};

export default AdBox;
