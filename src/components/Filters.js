import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Button } from '@chakra-ui/core';
import { setFilters } from './../redux/actions/filterActions';

import SelectableItem from './custom_filters/SelectableItem';
import PriceRange from './custom_filters/PriceRange';

import { invalidateStore } from './../redux/actions/globalStateActions';
import { defaultFilters, defaultSize, defaultAmenities } from './filters/defaultFilters';
const Filter = (props) => {
	const dispatch = useDispatch();
	const filters = useSelector((state) => state.filters, shallowEqual);
	const [ localFilter, setLocalFilter ] = useState(defaultFilters);
	const [ priceRange ] = useState([ defaultFilters.price_low.value, defaultFilters.price_high.value ]);
	const [ amenities, setAmenities ] = useState(defaultAmenities);
	const updateAmenities = (updatedAmenity) => {
		var modified = amenities;
		modified[updatedAmenity.id] = updatedAmenity;
		setAmenities({ ...modified });
	};

	const handlePriceRangeChange = (priceRange) => {
		var obj = localFilter;
		obj['price_low'] = { value: priceRange[0] };
		obj['price_high'] = { value: priceRange[1] };
		setLocalFilter(obj);
	};
	const applyFilter = (e) => {
		e.preventDefault();
		dispatch(
			setFilters({
				...localFilter,
				from: { value: 0 }
			})
		);
		dispatch(invalidateStore({ store_invalid: true }));

		props.toggleFilter();
	};

	const clearFilter = (e) => {
		e.preventDefault();
		resetAmenities();
		dispatch(
			setFilters({
				...defaultFilters
			})
		);
		dispatch(invalidateStore({ store_invalid: true }));
		props.toggleFilter();
	};
	const resetAmenities = () => {
		var modified = amenities;
		Object.entries(modified).map(([ key, item ]) => {
			item.selectedState = 0;
			return item;
		});
		setAmenities({ ...modified });
	};

	useEffect(
		() => {
			var oldFilter = localFilter;
			Object.entries(amenities).map(([ key, item ]) => {
				if (item.selectedState === 0) {
					if (oldFilter[item.id] !== undefined) {
						delete oldFilter[item.id];
					}
				} else {
					oldFilter = {
						...oldFilter,
						[item.id]: { value: item.states[item.selectedState] }
					};
				}
			});
			setLocalFilter(oldFilter);
		},
		[ amenities ]
	);
	useEffect(
		() => {
			console.log(filters);
			var tempAmenities = amenities;
			if (filters !== undefined) {
				Object.entries(filters).map(([ key, item ]) => {
					if (key in tempAmenities) {
						tempAmenities[key].selectedState = tempAmenities[key].states.indexOf(item.value);
					}
				});
				setAmenities({ ...tempAmenities });
			}
		},
		[ filters ]
	);

	return (
		<div className="filter">
			<h3>Price</h3>
			<PriceRange onPriceChange={handlePriceRangeChange} priceFilters={priceRange} />
			<br />
			<h3>Amenities</h3>
			<div className="amenities">
				{Object.entries(amenities).map(([ key, value ]) => (
					<SelectableItem updateAmenities={updateAmenities} key={key} info={value} />
				))}
			</div>

			<br />
			<Button onClick={applyFilter} variantColor="blue" variant="outline">
				Apply Filter
			</Button>
			<Button onClick={clearFilter} variantColor="blue" variant="outline">
				Clear Filter
			</Button>
		</div>
	);
};

export default Filter;
