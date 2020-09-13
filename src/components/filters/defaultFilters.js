import gymSelected from '../../images/filters/icons8-dumbbell-selected.png';
import gymUnset from '../../images/filters/icons8-dumbbell-unset.png';
import parkingSelected from '../../images/filters/icons8-parking-selected.png';
import parkingUnset from '../../images/filters/icons8-parking-unset.png';
import poolSelected from '../../images/filters/icons8-pool-selected.png';
import poolUnset from '../../images/filters/icons8-pool-unset.png';
import dog from '../../images/filters/icons8-dog.png';
import cat from '../../images/filters/icons8-cat.png';
import pets from '../../images/filters/icons8-pets-all.png';
import petsUnset from '../../images/filters/icons8-pets-unset.png';
import house from '../../images/filters/icons8-house.png';
import building from '../../images/filters/icons8-building.png';
import residence from '../../images/filters/icons8-residence.png';
import bungalow from '../../images/filters/icons8-bungalow.png';
import bathroom from '../../images/filters/icons8-bathtub1.png';
import bathroomUnset from '../../images/filters/icons8-bathtub-unset.png';
import bedrooms from '../../images/filters/icons8-bed.png';
import bedroomsUnset from '../../images/filters/icons8-bed-unset.png';
const defaultSize = 20;
const defaultFrom = 0;
const defaultPriceLow = 0;
const defaultPriceHigh = 1000000;
const defaultParamsFilters = {
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
const defaultParamsSearch = {
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
const defaultParamsMap = {
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
const defaults = {
	gym: { states: [ false, true ] },
	pets: { states: [ 0, 1, 2, 3 ] },
	garages: { states: [ 0, 1, 2, 3 ] },
	pool: { states: [ false, true ] },
	property_type: { states: [ 'any', 'house', 'apartment', 'multifamily' ] },
	bathrooms: { states: [ 0, 1, 2, 3, 4 ] },
	bedrooms: { states: [ 0, 1, 2, 3, 4 ] }
};
const defaultAmenities = {
	gym: {
		id: 'gym',
		type: 'feature',
		images: [ gymUnset, gymSelected ],
		...defaults.gym,
		name: [ 'Gym', 'Gym' ],
		selectedState: 0
	},

	pets: {
		id: 'pets',
		type: 'animals',
		images: [ petsUnset, dog, cat, pets ],
		...defaults.pets,
		name: [ 'Not specified', 'Dogs allowed', 'Cats allowed', 'All pets allowed' ],
		selectedState: 0
	},
	garages: {
		type: 'feature',
		images: [ parkingUnset, parkingSelected, parkingSelected, parkingSelected ],
		...defaults.garages,
		name: [ 'street', '1 spot', '2 spots', '3+ spots' ],
		id: 'garages',
		selectedState: 0
	},
	pool: {
		id: 'pool',
		type: 'feature',
		images: [ poolUnset, poolSelected ],
		...defaults.pool,
		name: [ 'Pool', 'Pool' ],
		selectedState: 0
	},
	property_type: {
		id: 'property_type',
		type: 'property',
		images: [ bungalow, house, building, residence ],
		...defaults.property_type,
		name: [ 'Any', 'Townhouse', 'Appartment', 'Multifamily' ],
		selectedState: 0
	},
	bathrooms: {
		id: 'bathrooms',
		type: 'property',
		images: [ bathroomUnset, bathroom, bathroom, bathroom, bathroom ],
		...defaults.bathrooms,
		name: [ 'Any', '1 bathroom', '2 bathrooms', '3 bathrooms', '4+ bathrooms' ],
		selectedState: 0
	},

	bedrooms: {
		id: 'bedrooms',
		type: 'property',
		images: [ bedroomsUnset, bedrooms, bedrooms, bedrooms, bedrooms ],
		...defaults.bedrooms,
		name: [ 'Any', '1 bedroom', '2 bedrooms', '3 bedrooms', '4+ bedrooms' ],
		selectedState: 0
	}
};
export { defaultParamsFilters, defaultParamsMap, defaultParamsSearch, defaultSize, defaultAmenities };
