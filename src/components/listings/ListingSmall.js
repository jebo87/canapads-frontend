import React, { useRef, useEffect, useState } from 'react';
///import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { startSetListingDetail } from './../../redux/actions/listingDetailActions';

import external from '../../images/external_link.png';
const ListingSmall = (props) => {
	const dispatch = useDispatch();
	const ref = useRef();
	const selectedId = useSelector((state) => state.global_state.selected_listing);
	//console.log(props);
	const setSelectedAd = () => {
		//props.setSelectedAd(props.feature.properties.id);
		dispatch(startSetListingDetail(props.feature.properties.id));
	};
	const [ listing ] = useState(props);
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	useEffect(
		() => {
			if (selectedId === listing.feature.properties.id) {
				ref.current.scrollIntoView(false);
			}
		},
		[ selectedId ]
	);

	//const cost = '$' + props.feature.properties.price.toFixed().replace(/\d(?=(\d{3}))/g, '$&,');
	const cost = formatter.format(props.feature.properties.price);
	return (
		<div ref={ref} className="listing_small" id={`listing_small_${props.feature.properties.id}`}>
			<div className="price_tag">
				<span className="cost">{cost}</span>
			</div>
			<div className="external">
				<a target="_blank" rel="noopener noreferrer" href={`/details/${props.feature.properties.id}`}>
					<img className="external_img" src={external} alt="" />{' '}
				</a>
			</div>
			<button onClick={setSelectedAd}>
				<div className="info_box">
					<div className="info_box_bottom">
						<span className="title">{props.feature.properties.title.substring(0, 55)}</span>
					</div>
				</div>
				<img className="box_image" src={props.feature.properties.image} alt="" />
			</button>
		</div>
	);
};

export default ListingSmall;
