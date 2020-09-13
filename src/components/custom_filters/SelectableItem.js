import React, { useState, useEffect } from 'react';
const SelectableItem = (props) => {
	const [ itemState, setItemState ] = useState(props.info);
	// const updateAmenities = useState(props.updateAmenities);

	const handleClick = (e) => {
		e.preventDefault();

		var newState = {
			selectedState: itemState.selectedState < itemState.states.length - 1 ? itemState.selectedState + 1 : 0
		};
		setItemState((old) => ({ ...old, ...newState }));
	};

	useEffect(
		() => {
			//This validation is required to prevent
			//unnecessary re-renders in Filter.js while SelectableItem's are being
			//loaded
			if (itemState.selectedState !== props.info.selectedState) {
				props.updateAmenities(itemState);
			}
		},
		[ props.info, itemState ]
	);
	return (
		<div className="selectable_item">
			<button id={itemState.caption} onClick={handleClick}>
				<img src={itemState.images[itemState.selectedState]} alt={itemState.caption} />
			</button>
			<label className="info" htmlFor={itemState.caption}>
				{itemState.name[itemState.selectedState]}
			</label>
		</div>
	);
};

export default SelectableItem;
