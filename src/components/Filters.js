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
	const [ localFilter, setLocalFilter ] = useState({ ...defaultFilters });
	const [ amenities, setAmenities ] = useState(defaultAmenities);
	const [ priceRange, setPriceRange ] = useState([
		defaultFilters['price_low'].value,
		defaultFilters['price_high'].value
	]);

	//local state management for amenities. Called everytime the user
	//clicks on one of the amtenities images.
	const updateAmenities = (updatedAmenity) => {
		var modified = amenities;
		modified[updatedAmenity.id] = updatedAmenity;
		setAmenities({ ...modified });
	};

	//updates the localFilter state with the current values for price_low and price_high
	const handlePriceRangeChange = (priceRange) => {
		var obj = localFilter;
		obj['price_low'] = { value: priceRange[0] };
		obj['price_high'] = { value: priceRange[1] };
		setPriceRange(priceRange);
		setLocalFilter(obj);
	};

	//dispatches the new state with the selected filters
	//triggers a new search
	const applyFilter = (e) => {
		e.preventDefault();
		dispatch(
			setFilters({
				...localFilter,
				from: { value: 0 }
			})
		);
		//required to invalidate the listings and trigger a search
		dispatch(invalidateStore({ store_invalid: true }));
		//hide filter panel
		props.toggleFilter();
	};

	//dispatches a clear state for redux with the default filters.
	//invalidates the store and triggers a re-render for the listings
	const clearFilter = (e) => {
		e.preventDefault();
		resetAmenities();
		resetPriceRange();
		dispatch(
			setFilters({
				...defaultFilters
			})
		);
		//needed to trigger new search.
		dispatch(invalidateStore({ store_invalid: true }));
		props.toggleFilter();
	};

	//clear the values for the amenities. resets the images and updates state.
	const resetAmenities = () => {
		var modified = amenities;
		Object.entries(modified).map(([ key, item ]) => {
			item.selectedState = 0;
			return item;
		});
		setAmenities({ ...modified });
	};

	const resetPriceRange = () => {
		let resetPrice = [ defaultFilters['price_low'].value, defaultFilters['price_high'].value ];
		handlePriceRangeChange(resetPrice);
	};

	//Everytime a filter is selected (from the amenities area) the localFilter
	//needs to be updated so the right state can be dispatched to redux when
	//the apply filter button is pressed
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

	//This is used when the filter panel becomes visible again and we need
	//to show the active filters.
	useEffect(
		() => {
			let tempAmenities = amenities;
			let tempPriceRange = [];
			if (filters !== undefined) {
				Object.entries(filters).map(([ key, item ]) => {
					//if one of the filters was selected, we need to restore its state
					//to show the right image on screen
					if (key in tempAmenities) {
						tempAmenities[key].selectedState = tempAmenities[key].states.indexOf(item.value);
					} else {
						//same applies for the price selection
						//we need to show the values previously selected by the user.
						if (key === 'price_low') {
							tempPriceRange[0] = item.value;
						} else {
							if (key === 'price_high') {
								tempPriceRange[1] = item.value;
							}
						}
					}
				});
				//this updates the local state for the price range
				handlePriceRangeChange(tempPriceRange);
				//update local state for amenities.
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
