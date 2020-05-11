import React from 'react';
import propertyType from '../../images/listing_detail/icons8-cottage.png';
import animals from '../../images/listing_detail/icons8-cat_footprint.png';
import bed from '../../images/listing_detail/icons8-bed.png';
// import '../../images/listing_detail/icons8-dumbbell.png';
// import '../../images/listing_detail/icons8-no_animals.png';
import parking from '../../images/listing_detail/icons8-parking.png';
// import '../../images/listing_detail/icons8-shield.png';
import bathroom from '../../images/listing_detail/icons8-shower_and_tub.png';
import laundry from '../../images/listing_detail/icons8-washing_machine.png';
// import '../../images/listing_detail/icons8-sofa.png';
// import '../../images/listing_detail/icons8-swimming_pool.png';
// import '../../images/listing_detail/icons8-year_of_dog.png';
// import '../../images/listing_detail/loading.gif';
const Features = (props) => {
	return (
		<div className="features">
			<div className="grid-container">
				<div className="grid-item">
					<div className="grid-item-text">Bedrooms</div>
					<div className="icons-text">
						<img src={bed} alt="" />
						<div className="icons-text-detail">{props.listing.rooms}</div>
					</div>
				</div>
				<div className="grid-item">
					<div className="grid-item-text">Bathrooms</div>
					<div className="icons-text">
						<img src={bathroom} alt="" />
						<div className="icons-text-detail">{props.listing.bathrooms}</div>
					</div>
				</div>
				<div className="grid-item">
					<div className="grid-item-text">Animals allowed</div>
					<div className="icons-text">
						<img src={animals} alt="" />
						<div className="icons-text-detail">{props.listing.pets}</div>
					</div>
				</div>
				<div className="grid-item">
					<div className="grid-item-text">Laundry</div>
					<div className="icons-text">
						<img src={laundry} alt="" />
						<div className="icons-text-detail">In building</div>
					</div>
				</div>
				<div className="grid-item">
					<div className="grid-item-text">Parking</div>
					<div className="icons-text">
						<img src={parking} alt="" />
						<div className="icons-text-detail">In building</div>
					</div>
				</div>
				<div className="grid-item">
					<div className="grid-item-text">Property type</div>
					<div className="icons-text">
						<img src={propertyType} alt="" />
						<div className="icons-text-detail">Condo</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
