import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { setFilters } from './../redux/actions/filterActions';

import SelectableItem from './custom_filters/SelectableItem';
import PriceRange from './custom_filters/PriceRange';
import gymSelected from '../images/filters/icons8-dumbbell-selected.png';
import gymUnset from '../images/filters/icons8-dumbbell-unset.png';
import parkingSelected from '../images/filters/icons8-parking-selected.png';
import parkingUnset from '../images/filters/icons8-parking-unset.png';
import poolSelected from '../images/filters/icons8-pool-selected.png';
import poolUnset from '../images/filters/icons8-pool-unset.png';
import dog from '../images/filters/icons8-dog.png';
import cat from '../images/filters/icons8-cat.png';
import pets from '../images/filters/icons8-pets.png';
import petsUnset from '../images/filters/icons8-pets-unset.png';
import house from '../images/filters/icons8-house.png';
import building from '../images/filters/icons8-building.png';
import residence from '../images/filters/icons8-residence.png';
import bungalow from '../images/filters/icons8-bungalow.png';
import { invalidateStore } from './../redux/actions/globalStateActions';

const defaults = {
	gym: { states: [ false, true ] },
	pets: { states: [ 0, 1, 2, 3 ] },
	garages: { states: [ 0, 1, 2, 3 ] },
	pool: { states: [ false, true ] },
	property_type: { states: [ `any`, 'house', 'apartment', 'multifamily' ] }
};

const Filter = (props) => {
	const dispatch = useDispatch();
	const [ localFilter, setLocalFilter ] = useState(props.localFilter);
	const [ priceRange ] = useState([ props.localFilter.price_low.value, props.localFilter.price_high.value ]);
	const [ amenities, setAmenities ] = useState([
		{
			images: [ gymUnset, gymSelected ],
			...defaults.gym,
			name: 'Gym',
			id: 'gym',
			selectedState: localFilter.gym === undefined ? 0 : defaults.gym.states.indexOf(localFilter.gym.value)
		},

		{
			images: [ petsUnset, dog, cat, pets ],
			...defaults.pets,
			name: 'Pets',
			id: 'pets',
			selectedState: localFilter.pets === undefined ? 0 : defaults.pets.states.indexOf(localFilter.pets.value)
		},
		{
			images: [ parkingUnset, parkingSelected, parkingSelected, parkingSelected ],
			...defaults.garages,
			name: 'Parking',
			id: 'garages',
			selectedState:
				localFilter.garages === undefined ? 0 : defaults.garages.states.indexOf(localFilter.garages.value)
		},
		{
			images: [ poolUnset, poolSelected ],
			...defaults.pool,
			name: 'Pool',
			id: 'pool',
			selectedState: localFilter.pool === undefined ? 0 : defaults.pool.states.indexOf(localFilter.pool.value)
		},
		{
			images: [ bungalow, house, building, residence ],
			...defaults.property_type,
			name: 'Type',
			id: 'property_type',
			selectedState:
				localFilter.property_type === undefined
					? 0
					: defaults.property_type.states.indexOf(localFilter.property_type.value)
		}
	]);
	const updateAmenities = (updatedAmenity) => {
		var oldFilter = localFilter;
		if (updatedAmenity.selectedState !== 0) {
			var newState = updatedAmenity.states[updatedAmenity.selectedState];
			setLocalFilter({
				...localFilter,
				[updatedAmenity.id]: { value: newState }
			});
		} else {
			delete oldFilter[updatedAmenity.id];
			setLocalFilter(oldFilter);
		}
	};

	const handlePriceRangeChange = (priceRange) => {
		var obj = { ...localFilter };
		obj['price_low'] = { value: priceRange[0] };
		obj['price_high'] = { value: priceRange[1] };
		setLocalFilter(obj);
	};

	// useEffect(
	// 	() => {
	// 		console.log(localFilter);
	// 	},
	// 	[ localFilter ]
	// );

	return (
		<div className="filter">
			<form action="">
				<h3>Price</h3>
				<PriceRange onPriceChange={handlePriceRangeChange} priceFilters={priceRange} />
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
						dispatch(
							setFilters({
								...localFilter,
								from: { value: 0 }
							})
						);
						dispatch(invalidateStore({ store_invalid: true }));

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
