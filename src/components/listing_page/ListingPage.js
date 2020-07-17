import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import '../../styles/styles.scss';
import 'normalize-scss/sass/_normalize.scss';
import PhotoGrid from '../../components/listing_page/PhotoGrid';

import Features from '../../components/listings/Features';
import Header from '../../components/Header';
import marker from '../../images/listing_detail/icons8-marker.png';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startSetListingDetail } from './../../redux/actions/listingDetailActions';
import styled from 'styled-components';

var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
const StyledHeader = styled(Header)`
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		width: 128rem;
		padding: 1.5rem 0 1.5rem 0;
		.search_area{
			width:30rem;
		}
		
	`;
const ListingPage = () => {
	const listing = useSelector((state) => state.listing_detail);

	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(
		() => {
			console.log('Testing');
			dispatch(startSetListingDetail(id));
		},
		[ id, dispatch ]
	);

	if (listing.id === undefined) return <div className="loading">Loading...</div>;
	else {
		// console.log(ad);
		//const cost = '$' + listing.price.toFixed().replace(/\d(?=(\d{3}))/g, '$&,') + ' /mo';
		const cost = formatter.format(listing.price);
		return (
			<React.Fragment>
				<div className="listing_page">
					<StyledHeader filter={{ searchParam: '' }} />

					<PhotoGrid images={listing.images} />
					<div className="content_listing">
						<div className="lp_left">
							<div className="title_price">
								<div className="title">
									<h2>{listing.title}</h2>
								</div>
								<div className="price">
									<h2>
										{cost}
										{'/mo'}
									</h2>
								</div>
							</div>
							<div className="location">
								<img src={marker} alt="" />
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
						<div className="lp_right">
							<button className="blue_button">Request more information</button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};

export default ListingPage;

// <div className="loading">
//                     <img src="../../../assets/img/loading.gif" alt="" />
//                 </div>
