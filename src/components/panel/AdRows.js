import React from 'react';
import chart from '../../images/icons8-chart.png';
import trash from '../../images/icons8-trash.png';
const AdRows = (props) => {
	const listing = props.listing;

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
