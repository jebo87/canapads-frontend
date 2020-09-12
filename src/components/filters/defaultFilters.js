import gymSelected from '../../images/filters/icons8-dumbbell-selected.png';
import gymUnset from '../../images/filters/icons8-dumbbell-unset.png';
import parkingSelected from '../../images/filters/icons8-parking-selected.png';
import parkingUnset from '../../images/filters/icons8-parking-unset.png';
import poolSelected from '../../images/filters/icons8-pool-selected.png';
import poolUnset from '../../images/filters/icons8-pool-unset.png';
import dog from '../../images/filters/icons8-dog.png';
import cat from '../../images/filters/icons8-cat.png';
import pets from '../../images/filters/icons8-pets.png';
import petsUnset from '../../images/filters/icons8-pets-unset.png';
import house from '../../images/filters/icons8-house.png';
import building from '../../images/filters/icons8-building.png';
import residence from '../../images/filters/icons8-residence.png';
import bungalow from '../../images/filters/icons8-bungalow.png';
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
const defaults = {
	gym: { states: [ false, true ] },
	pets: { states: [ 0, 1, 2, 3 ] },
	garages: { states: [ 0, 1, 2, 3 ] },
	pool: { states: [ false, true ] },
	property_type: { states: [ 'any', 'house', 'apartment', 'multifamily' ] }
};
const defaultAmenities = {
	gym: {
		type: 'feature',
		images: [ gymUnset, gymSelected ],
		...defaults.gym,
		name: [ '', 'Gym' ],
		selectedState: 0,
		id: 'gym'
	},

	pets: {
		type: 'animals',
		images: [ petsUnset, dog, cat, pets ],
		...defaults.pets,
		name: [ 'Not specified', 'Dogs', 'Cats', 'Cat / Dogs' ],
		id: 'pets',
		selectedState: 0
	},
	garages: {
		type: 'feature',
		images: [ parkingUnset, parkingSelected, parkingSelected, parkingSelected ],
		...defaults.garages,
		name: [ '', '1 Parking spot', '2 Parking spot', '3 parking spots' ],
		id: 'garages',
		selectedState: 0
	},
	pool: {
		type: 'feature',
		images: [ poolUnset, poolSelected ],
		...defaults.pool,
		name: [ ' ', 'Pool' ],
		id: 'pool',
		selectedState: 0
	},
	property_type: {
		type: 'property',
		images: [ bungalow, house, building, residence ],
		...defaults.property_type,
		name: [ 'Residence type', 'Townhouse', 'Appartment', 'wtf' ],
		id: 'property_type',
		selectedState: 0
		//: defaults.property_type.states.indexOf(localFilter.property_type.value)
	}
};
export { defaultFilters, defaultSize, defaultAmenities };
