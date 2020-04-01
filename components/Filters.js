import React, { useState, useEffect } from 'react';
import SelectableItem from './custom_filters/SelectableItem';
import filterImage from '../images/icons8-filter.png';
import gymSelected from '../images/selectable_items/icons8-dumbbell-selected.png';
import gymUnset from '../images/selectable_items/icons8-dumbbell-unset.png';
import parkingSelected from '../images/selectable_items/icons8-parking-selected.png';
import parkingUnset from '../images/selectable_items/icons8-parking-unset.png';
import poolSelected from '../images/selectable_items/icons8-pool-selected.png';
import poolUnset from '../images/selectable_items/icons8-pool-unset.png';
import dog from '../images/selectable_items/icons8-dog.png';
import cat from '../images/selectable_items/icons8-cat.png';
import pets from '../images/selectable_items/icons8-pets.png';
import petsUnset from '../images/selectable_items/icons8-pets-unset.png';
import house from '../images/selectable_items/icons8-house.png';
import building from '../images/selectable_items/icons8-building.png';
import residence from '../images/selectable_items/icons8-residence.png';
import bungalow from '../images/selectable_items/icons8-bungalow.png';
const defaults = {
	gym: { states: [ false, true ] },
	pets: { states: [ 0, 1, 2, 3 ] },
	garages: { states: [ 0, 1, 2, 3 ] },
	pool: { states: [ false, true ] },
	property_type: { states: [ `any`, 'house', 'apartment', 'multifamily' ] }
};
const Filter = (props) => {
	const [ filter, setFilter ] = useState(props.filter);
	const [ amenities, setAmenities ] = useState([
		{
			images: [ gymUnset, gymSelected ],
			...defaults.gym,
			name: 'Gym',
			id: 'gym',
			selectedState: props.filter.gym === undefined ? 0 : defaults.gym.states.indexOf(props.filter.gym.value)
		},

		{
			images: [ petsUnset, dog, cat, pets ],
			...defaults.pets,
			name: 'Pets',
			id: 'pets',
			selectedState: props.filter.pets === undefined ? 0 : defaults.pets.states.indexOf(props.filter.pets.value)
		},
		{
			images: [ parkingUnset, parkingSelected, parkingSelected, parkingSelected ],
			...defaults.garages,
			name: 'Parking',
			id: 'garages',
			selectedState:
				props.filter.garages === undefined ? 0 : defaults.garages.states.indexOf(props.filter.garages.value)
		},
		{
			images: [ poolUnset, poolSelected ],
			...defaults.pool,
			name: 'Pool',
			id: 'pool',
			selectedState: props.filter.pool === undefined ? 0 : defaults.pool.states.indexOf(props.filter.pool.value)
		},
		{
			images: [ bungalow, house, building, residence ],
			...defaults.property_type,
			name: 'Type',
			id: 'property_type',
			selectedState:
				props.filter.property_type === undefined
					? 0
					: defaults.property_type.states.indexOf(props.filter.property_type.value)
		}
	]);

	const updateAmenities = (updatedAmenity) => {
		var oldFilter = filter;
		if (updatedAmenity.selectedState != 0) {
			var newState = updatedAmenity.states[updatedAmenity.selectedState];

			setFilter({
				...filter,
				[updatedAmenity.id]: { value: newState }
			});
		} else {
			delete oldFilter[updatedAmenity.id];
			setFilter(oldFilter);
		}
	};

	const handleCheck = (e) => {
		var obj = { ...filter };
		var defaultval = false;
		defaultval = e.target.value;
		obj[e.target.id] = !defaultval;

		setFilter(obj);
	};

	const handleSelect = (e) => {
		var obj = { ...filter };
		obj[e.target.id] = { value: parseInt(e.target.value) };
		setFilter(obj);
	};

	return (
		<div className="filter">
			<button className="filter_button" onClick={props.toggleFilter}>
				<img src={filterImage} alt="" />
			</button>
			<form action="">
				<h3>Price</h3>

				<select name="price_low" id="price_low" onChange={handleSelect} value={'' + filter.price_low.value}>
					<option value="0">0</option>
					<option value="400">400</option>
					<option value="600">600</option>
					<option value="700">700</option>
					<option value="800">800</option>
					<option value="900">900</option>
				</select>

				<select name="price_high" id="price_high" onChange={handleSelect} value={'' + filter.price_high.value}>
					<option value="400">500</option>
					<option value="600">600</option>
					<option value="700">700</option>
					<option value="800">800</option>
					<option value="900">900</option>
					<option value="1000000">1000000</option>
				</select>

				<br />

				<h3>Amenities</h3>

				<div className="amenities">
					{amenities.map((item) => {
						return <SelectableItem updateAmenities={updateAmenities} key={item.name} info={item} />;
					})}
				</div>
				<br />

				<button
					onClick={(e) => {
						e.preventDefault();
						props.updateFilter({
							...filter,
							from: { value: 0 }
						});
						props.toggleFilter();
					}}
				>
					Apply Filter
				</button>
			</form>
		</div>
	);
};

export default Filter;
