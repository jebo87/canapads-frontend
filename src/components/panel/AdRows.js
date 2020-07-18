import React from 'react';
import chart from '../../images/icons8-chart.png';
import trash from '../../images/icons8-trash.png';
import Tag from '../utils/Tag';
const AdRows = (props) => {
	const listing = props.listing;
	const pets = listing.pets;
	const animals = pets == 1 ? 'no pets' : pets == 2 ? 'dogs OK' : pets == 3 ? 'cats OK' : 'cats/dogs OK';

	return (
		<React.Fragment>
			<div className="ad_rows">
				<div className="row">
					<div className="image">
						<img src={listing.images[0]} alt="" />
					</div>
					<div className="info">
						<h3>{listing.title}</h3>
						<div className="description">{listing.description.substring(0, 300)}...</div>

						<div className="tags">
							<Tag tag={animals} tagClass="green" />
							<Tag tag={animals} tagClass="coral" />
							<Tag tag={animals} tagClass="green" />
						</div>
					</div>
					<div className="buttons">
						<a href="">
							<img src={chart} alt="" />
						</a>
						<a href="">
							<img src={trash} alt="" />
						</a>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default AdRows;
