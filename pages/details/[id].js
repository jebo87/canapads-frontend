import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../styles/styles.scss';
import 'normalize-scss/sass/_normalize.scss';
import PhotoGrid from '../../components/listing_page/PhotoGrid';

import Features from '../../components/listings/Features';
import SmallImage from './../../components/carousel/SmallImage';
import Header from '../../components/Header';
import { getAd } from '../../backend_interface/api_if';
import marker from '../../images/listing_detail/icons8-marker.png';
import propertyType from '../../images/listing_detail/icons8-cottage.png';
import animals from '../../images/listing_detail/icons8-cat_footprint.png';
import bed from '../../images/listing_detail/icons8-bed.png';
import parking from '../../images/listing_detail/icons8-parking.png';
import bathroom from '../../images/listing_detail/icons8-shower_and_tub.png';
import laundry from '../../images/listing_detail/icons8-washing_machine.png';
var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
const ListingPage = (listing) => {
	// const [listing. setlisting. = useState(undefined);
	// const [images, setImages] = useState([]);
	console.log(listing);
	const cost = formatter.format(listing.price);

	if (!listing) return <div className="loading">Loading...</div>;
	else {
		// console.log(ad);
		const cost = '$' + listing.price.toFixed().replace(/\d(?=(\d{3}))/g, '$&,') + ' /mo';
		return (
			<React.Fragment>
				<div className="listing_page">
					<Header filter={{ searchParam: '' }} />

					<PhotoGrid images={listing.images} />
					<div className="content_listing">
						<div className="lp_left">
							<div className="title_price">
								<div className="title">
									<h2>{listing.title}</h2>
								</div>
								<div className="price">
									<h2>{cost}</h2>
								</div>
							</div>
							<div className="location">
								<img src={marker} />
								{listing.city}, {listing.neighborhood}
							</div>
							<div className="bottom_details">
								<Features listing={listing} />
								<div className="description">
									<h4>Description:</h4>
									<ReactMarkdown source={listing.description} />
								</div>
							</div>
						</div>
						<div className="lp_right" />
					</div>
				</div>
			</React.Fragment>
		);
	}
};

ListingPage.getInitialProps = async function(context) {
	const { id } = context.query;
	let listing = await getAd(id);

	return { ...listing };
};

export default ListingPage;

// <div className="loading">
//                     <img src="../../../assets/img/loading.gif" alt="" />
//                 </div>
