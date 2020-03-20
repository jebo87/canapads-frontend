import React, { useState, useEffect } from 'react';
import filter from '../images/icons8-filter.png';

const Filter = (props) => {
	const [ amenities, setAmenities ] = useState(props.filter);
	const [ gym, setGym ] = useState(undefined);

	const handleCheck = (e) => {
		var obj = { ...amenities };
		var defaultval = false;
		defaultval = e.target.value;
		obj[e.target.id] = !defaultval;

		setAmenities(obj);
	};

	const handleSelect = (e) => {
		var obj = { ...amenities };
		obj[e.target.id] = { value: parseInt(e.target.value) };
		setAmenities(obj);
	};

	return (
		<div className="filter">
			<button className="filter_button" onClick={props.toggleFilter}>
				<img src={filter} alt="" />
			</button>
			<form action="">
				<h3>Price</h3>

				<select name="price_low" id="price_low" onChange={handleSelect} value={'' + amenities.price_low.value}>
					<option value="0">0</option>
					<option value="400">400</option>
					<option value="600">600</option>
					<option value="700">700</option>
					<option value="800">800</option>
					<option value="900">900</option>
				</select>

				<select
					name="price_high"
					id="price_high"
					onChange={handleSelect}
					value={amenities && '' + amenities.price_high.value}
				>
					<option value="400">500</option>
					<option value="600">600</option>
					<option value="700">700</option>
					<option value="800">800</option>
					<option value="900">900</option>
					<option value="1000000">1000000</option>
				</select>

				<br />
				<h3>Pets</h3>
				<input type="radio" name="pets" id="cat" value="0" />
				<label htmlFor="cat">Cat</label>
				<input type="radio" name="pets" id="dog" value="1" />
				<label htmlFor="dog">Dog</label>
				<input type="radio" name="pets" id="both" value="2" />
				<label htmlFor="cat">Both</label>
				<br />
				<h3>Type</h3>

				<input type="radio" name="type" id="house" value="house" />
				<label htmlFor="type">House</label>
				<input type="radio" name="type" id="townhouse" value="townhouse" />
				<label htmlFor="type">Townhouse</label>
				<input type="radio" name="type" id="apartment" value="apartment" />
				<label htmlFor="type">Apartment</label>
				<input type="radio" name="type" id="type" value="type" />
				<br />
				<h3>Amenities</h3>
				<input type="checkbox" name="pool" id="pool" value="off" />
				<label htmlFor="pool">Pool</label>
				<input type="checkbox" name="parking" id="parking" value="on" />
				<label htmlFor="parking">Parking</label>
				<input type="checkbox" name="furnished" id="furnished" />
				<label htmlFor="furnished">Furnished</label>
				<input type="checkbox" name="rent_owner" id="rent_owner" />
				<label htmlFor="rent_owner">Rent By Owner</label>
				<input type="checkbox" name="gym" id="gym" onChange={(e) => handleCheck(e)} />
				<label htmlFor="gym">Gym</label>
				<br />

				<button
					onClick={(e) => {
						e.preventDefault();
						props.updateFilter({
							...amenities
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
