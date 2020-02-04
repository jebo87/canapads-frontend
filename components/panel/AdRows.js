import React from 'react';
import chart from '../../images/icons8-chart.png';
import trash from '../../images/icons8-trash.png';
import Tag from '../utils/Tag';
const AdRows = () => {
	const listing = {
		properties: {
			id: 555,
			title: 'long glamorous building in dorval',
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
			city: 'Montreal',
			country: 'Canada',
			price: 758,
			published_date: '2020-01-08T00:21:03.535547Z',
			rooms: 4,
			property_type: 'apartment',
			userdad_id: 1,
			pets: 4,
			last_updated: '2020-01-08T00:21:03.535547Z',
			featured: 1,
			lat: 46.44597871694664,
			lon: -73.72253206654769,
			bathrooms: 1,
			street: 'rielle',
			postal_code: 'H4G 2S7',
			state_province: 'Qc',
			neighborhood: 'dorval',
			house_number: '460',
			images: [
				'https://picsum.photos/1024/768?image=555',
				'https://picsum.photos/1024/768?image=585',
				'https://picsum.photos/1024/768?image=595',
				'https://picsum.photos/1024/768?image=605',
				'https://picsum.photos/1024/768?image=615'
			]
		}
	};
	const pets = listing.properties.pets;
	const animals = pets == 1 ? 'no pets' : pets == 2 ? 'dogs OK' : pets == 3 ? 'cats OK' : 'cats/dogs OK';

	return (
		<React.Fragment>
			<div className="ad_rows">
				<div className="row">
					<div className="image">
						<img src={listing.properties.images[0]} alt="" />
					</div>
					<div className="info">
						<h3>{listing.properties.title}</h3>
						<div className="description">{listing.properties.description.substring(0, 300)}...</div>

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
