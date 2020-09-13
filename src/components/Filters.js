import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { setFilters } from './../redux/actions/filterActions';

import SelectableItem from './custom_filters/SelectableItem';
import PriceRange from './custom_filters/PriceRange';

import { invalidateStore } from './../redux/actions/globalStateActions';
import { defaultParamsFilters, defaultSize, defaultAmenities } from './filters/defaultFilters';
const Filter = (props) => {
	const dispatch = useDispatch();
	const filters = useSelector((state) => state.filters, shallowEqual);
	const [ localFilter, setLocalFilter ] = useState({ ...filters });
	const [ amenities, setAmenities ] = useState({ ...defaultAmenities });
	const [ priceRange, setPriceRange ] = useState([
		defaultParamsFilters['price_low'].value,
		defaultParamsFilters['price_high'].value
	]);

	//local state management for amenities. Called everytime the user
	//clicks on one of the amtenities images.
	const updateAmenities = (updatedAmenity) => {
		var modified = { ...amenities };
		modified[updatedAmenity.id] = updatedAmenity;
		setAmenities(modified);
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
		resetLocalFilter();
		props.toggleFilter();
	};

	const resetLocalFilter = () => {
		let tempLocalFilter = { ...localFilter };
		let tempFilters = { ...filters };
		Object.entries(amenities).map(([ key, item ]) => {
			if (key in tempLocalFilter) {
				delete tempLocalFilter[key];
			}
			if (key in tempFilters) {
				delete tempFilters[key];
			}
		});

		setLocalFilter({ ...tempFilters, ...tempLocalFilter });
		dispatch(setFilters({ ...tempFilters, ...tempLocalFilter }));
		console.log({ ...tempFilters, ...tempLocalFilter });
		//needed to trigger new search.
		dispatch(invalidateStore({ store_invalid: true }));
	};

	//clear the values for the amenities. resets the images and updates state.
	const resetAmenities = () => {
		var modified = { ...amenities };
		Object.entries(modified).map(([ key, item ]) => {
			item.selectedState = 0;
			return item;
		});
		setAmenities(modified);
	};

	const resetPriceRange = () => {
		let resetPrice = [ defaultParamsFilters['price_low'].value, defaultParamsFilters['price_high'].value ];
		handlePriceRangeChange(resetPrice);
	};

	const syncActiveAmenities = (tempAmenities, filter) => {
		let tempPriceRange = [];
		if (filter !== undefined) {
			//iterate over the filters and find all the active filters
			//this is needed to display the filters as active when the filters panel is loaded
			Object.entries(filter).map(([ key, item ]) => {
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
		}
		return tempAmenities;
	};

	const syncDeletedAmenities = (tempAmenities) => {
		// we have to iterate over amenities and unselect the ones that were active before
		//but now are removed from the filter
		Object.entries(amenities).map(([ key, item ]) => {
			if (!(key in filters) && item.selectedState !== 0) {
				tempAmenities[key].selectedState = 0;
			}
		});

		return tempAmenities;
	};

	//Everytime a filter is selected (from the amenities area) the localFilter
	//needs to be updated so the right state can be dispatched to redux when
	//the apply-filter button is pressed
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
			//iterate over filters and amenities to sync the filters with the UI
			let partialSyncedAmenities = syncActiveAmenities({ ...defaultAmenities }, filters);
			let fullySyncedAmenities = syncDeletedAmenities(partialSyncedAmenities);
			//update local state for amenities.
			setAmenities({ ...fullySyncedAmenities });
		},
		[ filters ]
	);

	// useEffect(
	// 	() => {
	// 		console.log(localFilter);
	// 	},
	// 	[ localFilter ]
	// );
	return (
		<div className="filter">
			<h3>Price</h3>
			<PriceRange onPriceChange={handlePriceRangeChange} priceFilters={priceRange} />
			<br />

			<h3>Property Type</h3>
			<div className="amenities">
				{Object.entries(amenities).map(([ key, value ]) => {
					if (value.type === 'property') {
						return <SelectableItem updateAmenities={updateAmenities} key={key} info={value} />;
					}
				})}
			</div>
			<h3>Animals</h3>
			<div className="amenities">
				{Object.entries(amenities).map(([ key, value ]) => {
					if (value.type === 'animals') {
						return <SelectableItem updateAmenities={updateAmenities} key={key} info={value} />;
					}
				})}
			</div>
			<h3>Extras</h3>
			<div className="amenities">
				{Object.entries(amenities).map(([ key, value ]) => {
					if (value.type === 'feature') {
						return <SelectableItem updateAmenities={updateAmenities} key={key} info={value} />;
					}
				})}
			</div>

			<br />
			<div className="filter_actions">
				<button className="default_button" onClick={applyFilter}>
					Apply Filter
				</button>
				<button className="default_button clear_button" onClick={clearFilter}>
					Clear filters
				</button>
			</div>
		</div>
	);
};

export default Filter;
