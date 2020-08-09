import React from 'react';
const ListingCard = (props) => {
	return (
		<li className="listing_card">
			<div className="image">
				<img src={props.listing.images[0]} alt="" />
			</div>
			<div className="listing_card_bottom">
				<div className="title">{props.listing.title}</div>
				<div className="description">{props.listing.description.substring(1, 150)}</div>
			</div>
		</li>
	);
};
export default ListingCard;
