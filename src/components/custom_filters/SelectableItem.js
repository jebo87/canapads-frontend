import React, { useState, useEffect } from 'react';
const SelectableItem = (props) => {
	const [ itemState, setItemState ] = useState(props.info);
	const handleClick = (e) => {
		e.preventDefault();

		var newState = {
			selectedState: itemState.selectedState < itemState.states.length - 1 ? itemState.selectedState + 1 : 0
		};
		setItemState((old) => ({ ...old, ...newState }));
	};

	useEffect(
		() => {
			props.updateAmenities(itemState);
		},
		[ itemState ]
	);
	return (
		<div className="selectable_item">
			{itemState && (
				<button className="selectable_item_button" id={itemState.caption} onClick={handleClick}>
					<img src={itemState.images[itemState.selectedState]} alt="" />
					<span>{itemState.name[itemState.selectedState]}</span>
				</button>
			)}
		</div>
	);
};

export default SelectableItem;
