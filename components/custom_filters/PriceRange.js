import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);
const Range = Slider.Range;
const Handle = Slider.Handle;
const styles = {
	background: 'red'
};
const wrapperStyle = { width: 400, margin: 50 };
const maxValue = 4050;

const PriceRange = (props) => {
	const [ priceValues, setPriceValues ] = useState(props.priceFilters);
	const [ lowerBound, setLowerBound ] = useState(0);
	const [ upperBound, setUpperBound ] = useState(maxValue);
	const handleChange = (value) => {
		value[1] == maxValue ? (value[1] = 1000000) : value[1];

		setPriceValues(value);
	};
	const handleAfterChange = () => {
		//if 6050 is selected, we default to our maximum value (1M) to show all listings above 6000.
		priceValues[1] == maxValue ? (priceValues[1] = 1000000) : priceValues[1];
		props.onPriceChange(priceValues);
	};

	return (
		<div style={wrapperStyle}>
			{priceValues && (
				<div>
					<Range
						min={lowerBound}
						max={upperBound}
						step={50}
						defaultValue={priceValues}
						onChange={handleChange}
						onAfterChange={handleAfterChange}
					/>
					<span>
						Price between {priceValues[0]} and {priceValues[1] == 1000000 ? '4000+' : priceValues[1]}
					</span>
				</div>
			)}
		</div>
	);
};

export default PriceRange;
