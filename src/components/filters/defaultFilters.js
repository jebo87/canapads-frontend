const defaultSize = 20;
const defaultFrom = 0;
const defaultPriceLow = 0;
const defaultPriceHigh = 1000000;
const defaultFilters = {
	searchParam: {
		value: ''
	},
	from: {
		value: defaultFrom
	},
	size: {
		value: defaultSize
	},
	price_low: {
		value: defaultPriceLow
	},
	price_high: {
		value: defaultPriceHigh
	}
};

export { defaultFilters, defaultSize };
